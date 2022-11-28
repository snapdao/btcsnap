import React from 'react';

const BitcoinIcon2 = ({
  size = 32,
}: {
  size?: number;
}) => {
  return (
    <svg width={size} height={size} viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect width='32' height='32' rx='10' fill='url(#paint0_linear_2933_910)'/>
      <rect width='32' height='32' rx='10' fill='url(#paint1_radial_2933_910)' fillOpacity='0.12'/>
      <path fillRule='evenodd' clipRule='evenodd'
        d='M18.5568 10.9366C20.2098 11.5431 21.4004 12.4416 21.1275 14.1659C20.9209 15.421 20.2632 16.0345 19.3743 16.251C20.5571 16.913 21.1264 17.9179 20.5174 19.6806C19.7601 21.8913 18.0649 22.0918 15.8195 21.6636L15.2414 23.9967L13.9368 23.6734L14.5148 21.3403C14.3729 21.3025 14.2233 21.2677 14.0698 21.2319C13.8648 21.1842 13.6529 21.1348 13.4433 21.0746L12.8652 23.4079L11.563 23.0852L12.141 20.7519L9.54688 20.0454L10.1917 18.3956C10.1917 18.3956 11.1708 18.6649 11.1556 18.648C11.5188 18.7364 11.6964 18.4827 11.7691 18.305L12.6948 14.5646L13.3685 11.9061C13.3976 11.6188 13.3076 11.2428 12.777 11.0998C12.8131 11.0786 11.8218 10.8631 11.8218 10.8631L12.2081 9.29958L14.8817 9.96218L15.4479 7.67676L16.7948 8.01058L16.2287 10.296C16.4905 10.353 16.7464 10.4191 17.0051 10.4861L17.0052 10.4861C17.0901 10.508 17.1753 10.5301 17.2611 10.5519L17.8273 8.26645L19.1379 8.59124L18.5568 10.9366ZM14.9827 14.6115C15.003 14.6176 15.0248 14.6241 15.048 14.6311C15.8313 14.8665 18.1537 15.5644 18.5449 14.0104C18.9091 12.5333 16.8971 12.0822 15.9622 11.8725C15.8518 11.8478 15.7564 11.8264 15.6817 11.8071L14.9827 14.6115ZM13.952 19.219C13.9109 19.2067 13.8729 19.1955 13.8385 19.1853L14.5376 16.3809C14.6202 16.4024 14.7247 16.4269 14.8455 16.4553C15.9476 16.7143 18.4091 17.2927 18.0265 18.7781C17.6552 20.3204 14.917 19.506 13.952 19.219Z'
        fill='url(#paint2_linear_2933_910)'/>
      <defs>
        <linearGradient id='paint0_linear_2933_910' x1='0' y1='0' x2='38.2915' y2='12.1157'
          gradientUnits='userSpaceOnUse'>
          <stop stopColor='#F5A631'/>
          <stop offset='1' stopColor='#E07C09'/>
        </linearGradient>
        <radialGradient id='paint1_radial_2933_910' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse'
          gradientTransform='rotate(45.2114) scale(22.7114 47.0642)'>
          <stop stopColor='white'/>
          <stop offset='1' stopColor='white' stopOpacity='0'/>
        </radialGradient>
        <linearGradient id='paint2_linear_2933_910' x1='9.54688' y1='7.67676' x2='24.9685' y2='18.6568'
          gradientUnits='userSpaceOnUse'>
          <stop stopColor='white'/>
          <stop offset='1' stopColor='white' stopOpacity='0.6'/>
        </linearGradient>
      </defs>
    </svg>

  );
};

export default BitcoinIcon2;
