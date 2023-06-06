const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    const signer = ethers.provider.getSigner(0);

    let signer1;

    while (true) {
      signer1 = ethers.Wallet.createRandom();

      if (signer1.address.slice(0, 4) == '0x00') break;
    }

    const signerFinal = signer1.connect(ethers.provider);

    signer.sendTransaction({
      to: signerFinal.address,
      value: ethers.utils.parseEther('1')
    });

    return { game, signerFinal };
  }
  it('should be a winner', async function () {
    const { game, signerFinal } = await loadFixture(deployContractAndSetVariables);

    await game.connect(signerFinal).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
