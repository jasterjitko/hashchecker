//GitHub API Library
const { Octokit } = require("@octokit/rest");

//Insert your GitHub tokens here in next format ['token1', 'token2', 'token'] 
const gitTokens = ['']

//Insert your GitHub names here in next format ['namel', 'name2', 'name'] 
const gitNames = ['']

function generateUniqueName () {
return `result_${Math.floor(Math.random() * 150000000)}.txt`;
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}
const hash  = generateRandomString(12);

const randomIndex = Math.floor(Math.random() * 2);
const result = randomIndex === 0 ? "Success" : "Failure";

async function pushRandomName (repoOwner, token) {
  const octokit = new Octokit ({auth: token});
try {

const branchFilesData = await octokit.rest.repos.getContent({ 
owner: repoOwner,
repo: 'hashchecker',
branch: 'main',
});

console.log(branchFilesData, 'branchFilesData')


//Generate unique name for the file
let randomName = generateUniqueName();

//Check if file name is unique in the repo
const isAlreadyFileNameExist = !! branchFilesData.data.find((user) => { 
return user.path === randomName;
});

//If file name is not unique, generate new name
if (isAlreadyFileNameExist) {
pushRandomName (repoOwner, token);
}

// Push file to the repo
await octokit.rest.repos.createOrUpdateFileContents({
owner: repoOwner,
repo: 'hashchecker',
path: randomName,
message: Buffer.from(result).toString('base64'),
content: Buffer.from(hash).toString('base64'),
branch: 'main',
});
console.log('Pushed fact to randomFacts');
} catch (error) {
console.error('Error pushing fact to randomFacts', error);
}
}

//Function to start execution 
function startExecution() {
gitTokens.forEach((token, index) => {
pushRandomName (gitNames[index], token);
})
}

//Start execution
startExecution();
