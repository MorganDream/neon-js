import { NEP9Intent, parse, execute } from "../src/parse";
import { wallet, CONST } from "@cityofzion/neon-core";

test("errors if nothing given", () => {
  expect(() => parse("neo:")).toThrow();
});

describe("parse", () => {
  test.each([
    [
      "Address only",
      "neo:AeNkbJdiMx49kBStQdDih7BzfDwyTNVRfb",
      { attributes: [], address: "AeNkbJdiMx49kBStQdDih7BzfDwyTNVRfb" }
    ],
    [
      "Address with asset name",
      "neo:AeNkbJdiMx49kBStQdDih7BzfDwyTNVRfb?asset=neo",
      {
        attributes: [],
        address: "AeNkbJdiMx49kBStQdDih7BzfDwyTNVRfb",
        asset:
          "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b"
      }
    ],
    [
      "Address with assetId",
      "neo:AeNkbJdiMx49kBStQdDih7BzfDwyTNVRfb?asset=c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b",
      {
        attributes: [],
        address: "AeNkbJdiMx49kBStQdDih7BzfDwyTNVRfb",
        asset:
          "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b"
      }
    ],
    [
      "Address with amount only",
      "neo:AeNkbJdiMx49kBStQdDih7BzfDwyTNVRfb?amount=123.456",
      {
        attributes: [],
        address: "AeNkbJdiMx49kBStQdDih7BzfDwyTNVRfb",
        amount: 123.456
      }
    ],
    [
      "Address with asset and amount",
      "neo:AeNkbJdiMx49kBStQdDih7BzfDwyTNVRfb?asset=gas&amount=123.456",
      {
        attributes: [],
        address: "AeNkbJdiMx49kBStQdDih7BzfDwyTNVRfb",
        asset:
          "602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7",
        amount: 123.456
      }
    ],
    [
      "Address with attributes only",
      "neo:AeNkbJdiMx49kBStQdDih7BzfDwyTNVRfb?description=Donate%20To%20Me!",
      {
        attributes: [{ usage: 144, data: "446f6e61746520546f204d6521" }],
        address: "AeNkbJdiMx49kBStQdDih7BzfDwyTNVRfb"
      }
    ],
    [
      "Address with asset, amount and attributes",
      "neo:AeNkbJdiMx49kBStQdDih7BzfDwyTNVRfb?script=123456&amount=456.123&asset=gas",
      {
        attributes: [{ usage: 32, data: "123456" }],
        address: "AeNkbJdiMx49kBStQdDih7BzfDwyTNVRfb",
        asset:
          "602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7",
        amount: 456.123
      }
    ]
  ])("%s", (_: string, uri: string, expected: NEP9Intent) => {
    const result = parse(uri);
    expect(result).toMatchObject(expected);
  });
});

describe("execute", () => {
  const intent_to_transfer_neo = parse("neo:ASAZFGDqV1yVkMwyoRUW2utGueQoLzNfjd?asset=neo&amount=1");
  const intent_to_transfer_nep5 = parse("neo:ASAZFGDqV1yVkMwyoRUW2utGueQoLzNfjd?asset=b6730fd741b632401f89020409c6c0415d97dcee&amount=1");
  const privateKey = "KyXZAhPis76ZsTQQ5qMZSYF8UEc6diave9MBGu7MY1DiNSn3ZuYy";
  const account = new wallet.Account(privateKey);
  test("NEP9 send Native Asset", async() => {
    const response = await execute(intent_to_transfer_neo, account, 'https://seed11.ngd.network:20331');   
    expect(response.result).toBe(true);
  }, 5000)

  test("NEP9 send NEP5 Asset", async() => {
    const response = await execute(intent_to_transfer_nep5, account, 'https://seed11.ngd.network:20331');   
    expect(response.result).toBe(true);
  }, 5000)
});

