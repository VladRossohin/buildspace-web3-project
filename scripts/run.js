const main = async () => {
  const [owner, ...randomPersons] = await hre.ethers.getSigners();

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

  const waveContract = await waveContractFactory.deploy();

  await waveContract.deployed();

  console.log("Deployed to: ", waveContract.address);
  console.log("Deployed by: ", owner.address);

  let waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  for (let person of randomPersons) {
    waveTxn = await waveContract.connect(person).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();
  }
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runMain();
