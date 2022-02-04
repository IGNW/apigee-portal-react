import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export function CDWLogo(props: SvgIconProps) {
  const logoColor =
    props.color || (props.sx as { color?: 'string' })?.color || '#CC0000';
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 500 500"
      >
        <g id="layer1" transform="translate(-86.642033,-226.7388)">
          <g id="cdw_logo" transform="translate(0.13229152,-0.13228889)">
            <path
              id="path2129"
              fill={logoColor}
              d="M576.1,265.4c-4.9,0-8.9-4-8.9-9c0-5,4-9,8.9-9c4.9,0,8.9,4,8.9,9
			C585,261.4,581.1,265.4,576.1,265.4 M576.1,267.4c5.9,0,10.4-5,10.4-10.5c0-6-4.5-10.5-10.4-10.5s-10.4,5-10.4,10.5
			C565.7,262.4,570.2,267.4,576.1,267.4 M575.6,257.4c0.5,0,1.5,0,2,0.5c0.5,0.5,0.5,1.5,0.5,2.5c0,0.5,0.5,1.5,0.5,2h2.5
			c-0.5-1-0.5-2.5-1-3.5c0-1.5-0.5-2-2-2.5c1.5-0.5,2.5-1.5,2.5-3c0-3-2.5-3.5-4.5-3.5h-4v12.4h2v-5L575.6,257.4z M574.1,255.4v-3.5
			h2.5c1.5,0,2,0.5,2,1.5c0,1-0.5,1.5-2.5,2H574.1z"
            />
            <path
              id="path2131"
              fill={logoColor}
              d="M86.5,246v129.9c12.4-10.9,29.2-17.4,49-17.4c29.2,0,50.9,11.9,43.5,51.3h-41.5
			c2.5-18.9-1.5-21.4-6.9-21.4c-11.9,0-15.3,11.9-19.3,30.4c-3.5,17.4-5.4,30.4,5.9,30.4c5.9,0,10.4-3.5,16.3-18.9h29.7
			c7.4-7.5,15.3-14.9,24.2-21.9l9.9-47.3h53.9c2.5,0,4.9,0,7.4,0.5c14.8-8,30.7-15.9,46.5-22.4c93.5-39.3,186.4-48.8,241.3-29.4V246
			L86.5,246z M137,474.9c-9.9,19.4-12.9,38.3-5.4,53.2c25.2,50.3,142.9,49.3,256.2,1.5c28.7-11.9,54.4-25.9,76.7-40.8
			c66.3-44.8,92-95.1,73.2-132.4c-25.7-50.3-128.6-55.7-241.3-8c-10.4,4.5-20.3,9-30.2,13.9c32.6,5,39.1,27.9,32.6,57.7
			c-7.4,34.8-34.6,56.2-69.7,56.2h-56.9l12.9-60.7c-5.9,5-10.9,9.5-15.8,14.9h6.4C169.6,454.5,154.8,468.4,137,474.9L137,474.9z
			 M349.1,361.4l-5.4,72.7l25.7-72.7h47l-4.5,72.7h0.5l25.2-72.7h40.6l-49,115.5h-49.5l4.9-75.1h-0.5l-26.7,75.1h-48.5l-0.5-115.5
			H349.1z M413.4,545.1c-128.6,54.2-257.2,50.8-286.4-6c-9.4-17.9-8.4-38.8,1.5-61.2c-6.4,1-12.9,2-18.8,2c-8.9,0-16.8-1.5-23.2-3.5
			v231.4h459V462.9c-12.4,11.9-26.7,23.4-43.5,34.3C476.7,514.2,445.1,531.6,413.4,545.1L413.4,545.1z M251.7,419.1
			c2.5-11.4,3-19.4,1-24.4c-2-4.5-5.4-7.5-12.9-7.5h-4.5L222,450.5h4.5c7.4,0,12.4-2.5,15.8-7.5
			C246.7,438.6,249.2,430.6,251.7,419.1L251.7,419.1z"
            />
          </g>
        </g>
      </svg>
    </SvgIcon>
  );
}
export default CDWLogo;
