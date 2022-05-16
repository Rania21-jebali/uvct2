import  React from "react";

const SvgLogo = ({ title, titleId, ...props }) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 54 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M51.916 6.836H41.88c-1.198 0-1.198 0-.918 1.142.026.148.041.296.051.444.118.888.276 1.036 1.235 1.036h8.672v30.546c0 .755-.194.898-1.153.898-2.3 0-4.601.082-6.897 0-2.918-.102-5.596.607-8.295 1.321-.484.128-.948.317-1.418.48l.026.209c.275.015.55.046.826.046 5.984 0 11.973-.03 17.957 0 1.183.005 1.596-.46 1.596-1.224V8.12c-.102-.943-.709-1.285-1.647-1.285Z"
      fill="currentColor"
    />
    <path
      d="M22.563 40.545c-.439-.133-.872-.28-1.321-.398-2.036-.525-4.06-1.081-6.122-1.556-2.826-.648-5.77-.77-8.692-.959a.947.947 0 0 1-.317-.04.863.863 0 0 1-.265-.133.599.599 0 0 1-.173-.204.44.44 0 0 1-.046-.24V16.472c0-.806.081-.862 1.132-.847 1.26.026 1.194-.132 1.194.919v18.364c0 .74 0 .714.939.867 4.734.74 9.228 2.179 13.232 4.23.2.111.393.239.572.372l-.133.168ZM30.827 40.372c.204-.153.429-.291.668-.414 1.806-.78 3.556-1.663 5.454-2.285 2.127-.699 4.392-1.158 6.611-1.704.5-.102 1.01-.178 1.53-.23a.587.587 0 0 0 .378-.142.313.313 0 0 0 .097-.148.3.3 0 0 0 .01-.163V16.334c0-.699 0-.699.974-.709 1.393 0 1.393 0 1.393 1.046v19.956c0 .878-.077.913-1.194 1-2.01.158-4.035.265-6.024.54a46.787 46.787 0 0 0-9.193 2.225 5.09 5.09 0 0 1-.566.122l-.138-.142Z"
      fill="#791214"
    />
    <path
      d="M26.772 47.998H16.717c-.821 0-.862-.061-.867-.954 0-1.362.459-1.882 1.908-2.03a25.054 25.054 0 0 1 2.392-.123h13.86c.929.036 1.852.174 2.755.414.821.178.949.428.954 1.341v.393c0 .883-.056.944-.877.944-3.362.015-6.719.02-10.07.015Z"
      fill="currentColor"
    />
    <path
      d="M24.185 17.406c-3.132-1.76-6.6-3.148-10.279-4.112a3.69 3.69 0 0 0-.076.53v17.023a.677.677 0 0 0 .137.46.996.996 0 0 0 .44.326c3.33 1.536 6.355 3.418 8.998 5.596.27.215.515.444.73.694.076.163.111.332.101.505a2.326 2.326 0 0 1-.597-.107c-1.423-.74-2.76-1.612-4.264-2.224-2.107-.873-4.331-1.592-6.535-2.321-.939-.327-1.337-.607-1.337-1.393V12.116c0-.659.255-.74 1.087-.526 3.418.934 6.596 2.306 9.402 4.056.694.428 1.341.898 2.005 1.351.112.087.209.184.295.286l-.107.123ZM39.49 13.263c-1.756.618-3.551 1.179-5.255 1.878-1.704.698-3.28 1.484-5 2.198.103-.122.22-.234.348-.341 2.75-2.01 5.953-3.633 9.462-4.786.715-.25 1.434-.469 2.158-.688.434-.133.725 0 .806.347.03.163.041.321.03.484V32.18c0 1.076-.27 1.296-1.596 1.668a41.996 41.996 0 0 0-7.361 2.755c-1.02.505-1.954 1.112-2.928 1.688-.077.046-.148.123-.235.133-.22.025-.449.03-.678.04 0-.178-.041-.402.081-.52.47-.49.99-.948 1.556-1.377 1.194-.847 2.403-1.689 3.683-2.449 1.464-.862 2.995-1.647 4.525-2.428a1.06 1.06 0 0 0 .47-.362.74.74 0 0 0 .142-.495V13.901c0-.173 0-.347-.04-.52l-.169-.118Z"
      fill="#791214"
    />
    <path
      d="m28.98 28.46-.29-.046c-.235-.03-.47 0-.694.077-.378.117-.75.25-1.127.352a1.99 1.99 0 0 1-.868.01.19.19 0 0 1-.071-.036c.367-.081.734-.158 1-.459-.674.357-1.352.388-2.046.066.26 0 .515.02.77-.04.255-.051.495-.169.694-.337-.367.122-.74.204-1.127.178-.388-.03-.755-.117-1.082-.346.556.035 1.097.015 1.592-.27-.755.162-1.464.06-2.107-.373a1.631 1.631 0 0 1-.561-.602c.627.331 1.28.556 2.005.449a3.2 3.2 0 0 1-1.301-.342 3.096 3.096 0 0 1-1.036-.852c-.316-.383-.586-.944-.571-1.127.546.632 1.173 1.107 2.005 1.25l.015-.026-.189-.092a4.222 4.222 0 0 1-1.331-.944 3.252 3.252 0 0 1-.71-1.198 4.143 4.143 0 0 1-.218-.99c-.02-.311-.036-.628-.052-.939 0-.02.01-.04.02-.056.134.505.353.985.654 1.413.306.434.648.822 1.117 1.097-.168-.204-.337-.398-.495-.602a5.35 5.35 0 0 1-.643-1.143c-.163-.392-.28-.8-.351-1.219a6.043 6.043 0 0 1-.067-1.576c.026-.28.061-.556.112-.832.051-.275.138-.55.21-.826 0-.005.01-.005.03-.02.01.03.015.06.02.091 0 .138-.01.281.006.419.03.341.05.683.117 1.02.097.54.275 1.066.52 1.556.332.648.77 1.234 1.301 1.734.474.444.98.847 1.515 1.214.592.414 1.189.827 1.77 1.255.352.255.669.562.934.903.255.322.434.694.525 1.092.067.321.082.648.041.97-.01.05-.02.101-.036.147Z"
      fill="currentColor"
    />
    <path
      d="M28.904 26.613a7.667 7.667 0 0 0-.22-.331c-.285-.393-.647-.714-.994-1.046-.388-.367-.791-.724-1.148-1.117a2.523 2.523 0 0 1-.633-1.321 2.427 2.427 0 0 1 .52-2.005c.016-.01.031-.02.047-.026 0 .322-.02.633.005.939.03.306.081.612.245.877-.398-1.433.382-2.805 1.352-3.366a.735.735 0 0 1-.046.137 4.79 4.79 0 0 0-.373 1.04 3.677 3.677 0 0 0-.087 1.205c.036.372.133.734.286 1.076.235.541.566 1.03.877 1.53.19.286.342.592.46.914.076.22.097.459.066.688a1.5 1.5 0 0 1-.245.648c-.036.056-.071.102-.112.158ZM23.43 30.057a4.309 4.309 0 0 1-1.617-.893l.01-.025c.082.035.169.076.25.112.301.122.612.214.934.28a7.287 7.287 0 0 0 1.627.169c.658 0 1.306-.138 1.908-.403.27-.123.536-.27.806-.398.383-.184.77-.327 1.199-.352.112 0 .224.005.336.015.031.01.062.026.092.04-.087.072-.163.128-.24.19-.316.244-.56.56-.805.867-.317.408-.618.826-.985 1.194a3.303 3.303 0 0 1-1.22.795 3.255 3.255 0 0 1-1.08.184.155.155 0 0 1-.082-.026 2.04 2.04 0 0 0 .852-.474 2.685 2.685 0 0 1-.96.2 2.09 2.09 0 0 1-.943-.21 2.5 2.5 0 0 0 1.25-.199 2.5 2.5 0 0 1-1.082-.04 2.53 2.53 0 0 1-.964-.485c.449.122.908.209 1.357.178-.143-.02-.306-.03-.464-.066a3.25 3.25 0 0 1-.48-.148 2.907 2.907 0 0 1-.449-.24 2.902 2.902 0 0 1-.382-.321 1.106 1.106 0 0 1-.28-.403c.433.25.912.408 1.412.459Z"
      fill="currentColor"
    />
    <path
      d="M27.22 30.745c.087-.097.159-.173.225-.255.24-.306.48-.612.714-.918.25-.337.54-.643.862-.913a.226.226 0 0 0 .072-.138c.03-.26.046-.525.05-.79a2.341 2.341 0 0 0-.183-.832.184.184 0 0 1-.01-.138c.23-.55.617-.948 1.188-1.127.572-.184 1.067-.04 1.48.393.087.092.168.194.24.296.05.066.04.091-.046.102a1.342 1.342 0 0 0-1.01.673 10.29 10.29 0 0 0-.618 1.26c-.194.434-.367.877-.642 1.275-.291.429-.71.755-1.189.939a2.791 2.791 0 0 1-.98.194 3.316 3.316 0 0 1-.152-.02Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.64 42.443c-.872-.245-1.73-.465-2.586-.689a21.612 21.612 0 0 0-6-.821c-2.5.04-4.999 0-7.498 0-.658 0-.888-.174-.934-.679V9.988h8.688c.918 0 1.076-.158 1.198-1.035.031-.225.077-.45.138-.669.235-.82.143-.938-.76-.938H1.418C.438 7.346 0 7.774 0 8.703v33.214c0 .715.429 1.041 1.357 1.041H19.7c.21-.005.413-.026.622-.051l.082-.153a6.342 6.342 0 0 0-.765-.311Z"
      fill="currentColor"
    />
    <path
      d="m27.032 0 12.503 3.8-12.503 3.8-12.504-3.8L27.032 0Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.028 11.84c0 .316.178.602.464.73.174.076.352.153.53.224a18.644 18.644 0 0 0 7.112 1.403c2.505 0 4.902-.495 7.111-1.403.28-.117.561-.24.842-.367a.795.795 0 0 0 .454-.725V6L26.94 8.5l-7.912-2.347v5.688Z"
      fill="currentColor"
    />
    <path
      d="M15.63 10.004c0 .443-.357.8-.8.8a.799.799 0 0 1-.801-.8c0-.296.209-1.061.448-1.2V5.102h.75V8.8c.24.143.403.908.403 1.204Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgLogo;