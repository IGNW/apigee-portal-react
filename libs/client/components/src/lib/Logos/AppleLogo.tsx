import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export function AppleLogo(props: SvgIconProps) {
  return (
    <SvgIcon style={{ fill: '#5E7B89' }} {...props}>
      <svg
        height="24"
        version="1.1"
        viewBox="0 0 512 512"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M322.371,94.417c15.566-20.128,27.352-48.601,23.086-77.667       c-25.443,1.766-55.176,18.093-72.506,39.355c-15.807,19.29-28.809,47.938-23.742,75.778       C277.006,132.753,305.73,116.036,322.371,94.417L322.371,94.417z M322.371,94.417" />
        <path d="M446,177.287c-24.432-30.717-58.758-48.544-91.182-48.544c-42.797,0-60.9,20.552-90.637,20.552       c-30.658,0-53.955-20.49-90.966-20.49c-36.356,0-75.07,22.283-99.619,60.381C39.091,242.838,44.999,343.711,100.92,429.63       c20.01,30.746,46.734,65.316,81.693,65.616c31.102,0.294,39.871-20.011,82.018-20.218c42.141-0.239,50.137,20.49,81.184,20.158       c34.986-0.271,63.172-38.585,83.184-69.325c14.344-22.04,19.688-33.131,30.807-58.018       C378.889,336.953,365.918,221.575,446,177.287L446,177.287z M446,177.287" />
      </svg>
    </SvgIcon>
  );
}
export default AppleLogo;
