// declare const smilesRaffle: {
// 	ajax_url : string,
// 	raffle_nonce : string
// }

// custom.d.ts

declare module '*.sass' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}
declare module '*.webp' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  import React from 'react';
  const value: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default value;
}

declare module '*.mp3' {
	const value : string;
	export default value;
}
declare module '*.wav' {
	const value : string;
	export default value;
}

declare global{
	interface Window{
		result : string,
    smilesRaffle: any
	}
}
