const contractData = {
  "address": "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  "abi": [
    "constructor()",
    "event Transfer(address indexed,address indexed,uint256)",
    "function balanceOf(address) view returns (uint256)",
    "function balances(address) view returns (uint256)",
    "function name() view returns (string)",
    "function owner() view returns (address)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function transfer(address,uint256)"
  ]
};

const contractAddress = contractData.address;
const contractABI = contractData.abi;
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const contract = new ethers.Contract(contractAddress, contractABI, provider);
const users = document.getElementById("users");

async function getBalanceOfUser(user) {
  const balance = await contract.balanceOf(user);
  return balance;
}


async function displayUsers(){
  const signers = await provider.listAccounts();

  signers.forEach(user => {
   
    const div = document.createElement("div");
    const span = document.createElement("span"); 
    
    getBalanceOfUser(user.address).then(balance => {
      span.innerText = `Balance: ${ethers.formatUnits(balance, 0)}`;
    });
    
    div.innerHTML = `<p>${user.address}</p>`;
    div.appendChild(span);
    users.appendChild(div);
  });
}

async function displayContractInfo() {
  try {
    const name = await contract.name();
    const symbol = await contract.symbol();
    document.getElementById("contractInfo").textContent = `Name: ${name}, Symbol: ${symbol}`;
  } catch (error) {
    console.error("Error displaying contract info:", error);
    document.getElementById("contractInfo").textContent = "Failed to load contract info.";
  }
}


async function transferTokens() {
  try {
    const signer = await provider.getSigner();

    console.log(signer);
    const contractWithSigner = await contract.connect(signer);
    const recipientAddress = "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65"; // Replace with recipient address
    const amount = ethers.parseUnits("10", 0); // Transfer 10 tokens
    const transaction = await contractWithSigner.transfer(recipientAddress, amount);
    await transaction.wait(); // Wait for the transaction to be mined
    console.log("Tokens transferred!");
    displayContractInfo(); // Update UI after transfer
  } catch (error) {
    console.error("Transfer failed:", error);
    alert("Token transfer failed. See console for details.");
  }
}

displayUsers();
displayContractInfo();

document.getElementById("transferButton").addEventListener("click", transferTokens);