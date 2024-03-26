import { win$ } from "unlock/observables/win";
import { hexToBase64 } from "core";
import { makeReplayGif } from "unlock/utils/make-replay-gif";
import { Observable, concatMap, from, filter } from "rxjs";

export const replayGifURL$: Observable<string> = win$.pipe(
	filter(win => win),
	concatMap(
		() => from(
			makeReplayGif()
				.then(hexToBase64)
				.then(base64 => `data:image/gif;base64,${base64}`)
		)
	)
);
