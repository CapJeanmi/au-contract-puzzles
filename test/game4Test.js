const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const signer = ethers.provider.getSigner(0);
    const signer1 = ethers.provider.getSigner(1);

    const signerAddress1 = await signer.getAddress();
    const signerAddress2 = await signer1.getAddress();

    return { game, signer, signer1, signerAddress1, signerAddress2 };
  }
  it('should be a winner', async function () {
    const { game, signer, signer1, signerAddress1, signerAddress2 } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.connect(signer).write(signerAddress1);

    // await game.connect(signer1).write(signerAddress2);

    await game.connect(signer).win(signerAddress1);

    // await game.connect(signer1).win(signerAddress2);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
 