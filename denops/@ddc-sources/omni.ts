import {
  BaseSource,
  DdcOptions,
  Item,
  SourceOptions,
} from "https://deno.land/x/ddc_vim@v2.2.0/types.ts";
import { Denops, op } from "https://deno.land/x/ddc_vim@v2.2.0/deps.ts";

type Params = {
  blacklist: string[];
  omnifunc: string;
};

export class Source extends BaseSource<Params> {
  isBytePos = true;

  async getCompletePosition(args: {
    denops: Denops;
    sourceParams: Params;
  }): Promise<number> {
    const omnifunc = (args.sourceParams.omnifunc == "")
      ? await op.omnifunc.getLocal(args.denops)
      : args.sourceParams.omnifunc;
    if (omnifunc == "" || omnifunc in args.sourceParams.blacklist) {
      return Promise.resolve(-1);
    }

    try {
      const pos = await args.denops.call(omnifunc, 1, "") as number;
      return Promise.resolve(pos);
    } catch (e: unknown) {
      console.error(
        `[ddc.vim] omni: omnifunc ${omnifunc} getCompletePosition() is failed`,
      );
      console.error(e);
      return Promise.resolve(-1);
    }
  }
  async gather(args: {
    denops: Denops;
    options: DdcOptions;
    sourceOptions: SourceOptions;
    sourceParams: Params;
    completeStr: string;
  }): Promise<Item[]> {
    const omnifunc = (args.sourceParams.omnifunc == "")
      ? await op.omnifunc.getLocal(args.denops)
      : args.sourceParams.omnifunc;
    if (omnifunc == "" || omnifunc in args.sourceParams.blacklist) {
      return Promise.resolve([]);
    }

    try {
      const ret = await args.denops.call(omnifunc, 0, "");
      if (ret instanceof Array && ret.length != 0) {
        return Promise.resolve(ret.map(
          (candidate) =>
            (candidate instanceof String) ? { word: candidate } : candidate,
        ));
      } else {
        // Invalid
        return [];
      }
    } catch (e: unknown) {
      console.error(
        `[ddc.vim] omni: omnifunc ${omnifunc} getCompletePosition() is failed`,
      );
      console.error(e);
      return [];
    }
  }

  params(): Params {
    return {
      blacklist: [
        "LanguageClient#complete",
        "ccomplete#Complete",
        "htmlcomplete#CompleteTags",
        "phpcomplete#CompletePHP",
        "rubycomplete#Complete",
      ],
      omnifunc: "",
    };
  }
}
