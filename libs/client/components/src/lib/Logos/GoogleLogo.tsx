import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export function GoogleLogo(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        width="24"
        height="24"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
        color="rgb(223, 62, 48)"
      >
        <path
          fill="currentColor"
          d="M17.5 14a5.51 5.51 0 0 1-4.5 3.93a6.15 6.15 0 0 1-7-5.45A6 6 0 0 1 12 6a6.12 6.12 0 0 1 2.27.44a.5.5 0 0 0 .64-.21l1.44-2.65a.52.52 0 0 0-.23-.7A10 10 0 0 0 2 12.29A10.12 10.12 0 0 0 11.57 22A10 10 0 0 0 22 12.52v-2a.51.51 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h5"
        ></path>
      </svg>
    </SvgIcon>
  );
}
export default GoogleLogo;
