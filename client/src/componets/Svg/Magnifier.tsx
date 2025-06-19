export default function Magnifier({ className, width = 20, height = 20, ...rest }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...rest}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d="M15.9583 15.9583L19.1666 19.1667M18.2499 9.54168C18.2499 4.7322 14.3511 0.833344 9.54158 0.833344C4.73211 0.833344 0.833252 4.7322 0.833252 9.54168C0.833252 14.3512 4.73211 18.25 9.54158 18.25C14.3511 18.25 18.2499 14.3512 18.2499 9.54168Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
