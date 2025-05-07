'use client'
import Link from 'next/link'
import Image from 'next/image'
import ContactForm from './components/ContactForm'

export default function Home() {
  return (
    <section className="w-full hero-section">
      <div className="grid max-w-screen-xl px-16 py-8 mx-auto my-16 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
            Leading AI & Machine Learning Solutions
          </h1>
          <p className="max-w-2xl mb-6 lg:mb-8 md:text-lg lg:text-xl text-gray-300 bg-[hsl(0_0%_0%_/_30%)] p-4 rounded-[12px]">
            Headquartered in the Netherlands, we specialize in consulting and development of cutting-edge AI, machine learning, and data analysis solutions for businesses. Our robust expertise in technology innovation and development consulting empowers you to stay competitive in the rapidly evolving digital landscape.
          </p>
          <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300">
            Discover Our Solutions
          </a>
          <a href="#contact" className="scroll-smooth inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border border-gray-300 rounded-lg hover:text-green-400 hover:bg-[#00241C] hover:border-green-400 focus:ring-4 focus:ring-green-100">
            Contact Our Team
          </a>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <dotlottie-player
            src="https://lottie.host/f1a47e84-bfe0-44df-843e-73b541c513c5/EDMc8naIZU.json"
            background="transparent"
            speed="1"
            style={{ width: '30vw', height: '30vh' }}
            loop
            autoplay></dotlottie-player>
        </div>
      </div>
      <section className="py-12 bg-[#00000033]">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center mx-16">
            <a href="https://www.ns.nl" target="_blank" rel="noopener noreferrer" className="brand-logo opacity-50 hover:opacity-100 hover:transition-all cursor-pointer">
              <svg height="50" width="75" viewBox="-2.04189744 -2.04189744 178.37648488 72.14704288" xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M76.19003 32.7088C72.73763 29.33945 68.00393 27.23954 62.8194 27.23954L26.08874 27.23954L39.67292 13.61977L74.23248 13.61977C75.69174 13.6435 77.05609 14.28415 78.01707 15.24513L98.07894 35.36632C101.53134 38.7238 106.25317 40.83558 111.47329 40.83558L148.23955 40.83558L134.63165 54.45535L100.10767 54.45535C98.62468 54.40789 97.28406 53.77911 96.31122 52.78254L76.19003 32.7088zM86.68959 62.43976C90.10639 65.89216 94.85196 68.06325 100.10767 68.06325L140.23141 68.06325L174.29269 34.03756L140.23141 0L121.00001 0L148.23955 27.23954L111.47329 27.23954C110.0259 27.23954 108.67351 26.65821 107.7243 25.73282L87.6387 5.64723C84.19817 2.15924 79.46447 0.01187 74.23248 0L34.04952 0L0 34.03756L34.04952 68.06325L53.29268 68.06325L26.08874 40.83558L62.8194 40.83558C64.27866 40.83558 65.59556 41.41691 66.5684 42.36602L86.68959 62.43976" style={{ fill: "#fff", fillOpacity: 1, fillRule: "evenodd", stroke: "none" }}/></svg>
            </a>
            <a href="https://www.klm.com" target="_blank" rel="noopener noreferrer" className="brand-logo opacity-50 hover:opacity-100 hover:transition-all cursor-pointer">
              <svg height="50" width="70" viewBox="0 0 350 203.53" xmlns="http://www.w3.org/2000/svg" fill="none"><g fill="#00a1e4"><path d="M109.16 96.38c-.28-7.64-.15-15.3-.07-22.94 43.97.13 87.94.03 131.91.05.01 7.61.01 15.21 0 22.81-43.95.05-87.9-.1-131.84.08zm59.602-96.38h10.98c.09 3.73.08 7.45.06 11.18 3.67-.01 7.35.01 11.02-.02.03 3.66.03 7.32-.08 10.98-3.64 0-7.29.02-10.93 0 0 3.6-.01 7.21.02 10.82-3.62.23-7.24.18-10.86.15-.02-3.66-.02-7.33-.04-11-3.68.05-7.35.03-11.02.04-.06-3.65-.05-7.31-.06-10.96 3.7-.01 7.4-.02 11.09 0-.08-3.73.25-7.48-.18-11.19zm91.286 49.597a19.125 19.125 0 0 1-19.125 19.125 19.125 19.125 0 0 1-19.125-19.125 19.125 19.125 0 0 1 19.125-19.125 19.125 19.125 0 0 1 19.125 19.125zm-43.95 0a19.125 19.125 0 0 1-19.125 19.125 19.125 19.125 0 0 1-19.125-19.125 19.125 19.125 0 0 1 19.125-19.125 19.125 19.125 0 0 1 19.125 19.125zm-43.95 3.43e-4a19.125 19.125 0 0 1-19.125 19.125 19.125 19.125 0 0 1-19.125-19.125 19.125 19.125 0 0 1 19.125-19.125 19.125 19.125 0 0 1 19.125 19.125zm-43.95 0a19.125 19.125 0 0 1-19.125 19.125 19.125 19.125 0 0 1-19.125-19.125 19.125 19.125 0 0 1 19.125-19.125 19.125 19.125 0 0 1 19.125 19.125z"/><path d="M206.63 115.75c18.28-.06 36.56.12 54.84-.09 5.77 15.69 10.82 31.65 16.27 47.46.45-.71 1.09-1.31 1.32-2.14 5.21-15.09 10.54-30.14 15.8-45.22 18.38-.02 36.76-.03 55.14.01v87.66c-11.25.14-22.51.05-33.76.05-.02-20.18.1-40.37-.06-60.56-1.57.88-1.73 2.87-2.4 4.36-6.53 18.75-13.23 37.44-19.76 56.19-10.58 0-21.17.14-31.74-.07-6.63-19.17-13.49-38.25-20.18-57.39-.24-1.07-.84-1.85-1.78-2.35-.03 19.94.01 39.89-.01 59.84-11.23 0-22.46 0-33.69-.01.02-29.24-.01-58.49.01-87.74zm-206.63 0c11.1 0 22.2-.01 33.31.01.02 10.62-.02 21.25.01 31.88 11.01-10.54 21.77-21.33 32.78-31.87 11.19-.03 22.38-.03 33.57 0-12.9 13.11-26.15 25.88-38.95 39.08 16.13 15.64 31.71 31.86 47.98 47.33.14-28.8.02-57.61.06-86.42 11.35-.02 22.7-.02 34.05 0 0 21.85-.02 43.7 0 65.55 18.13-.05 36.25.06 54.37-.06.25 7.41.04 14.83.12 22.24-44.06 0-88.13.04-132.19-.02-10.42-10.55-20.98-20.96-31.45-31.46-.15 10.51.02 21.01-.09 31.52-11.19-.08-22.38.01-33.57-.05z"/></g></svg>
            </a>
            <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer" className="brand-logo opacity-50 hover:opacity-100 hover:transition-all cursor-pointer" >
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 603 182" style={{ fill: "#fff", transform: "translateY(-20px)" }}><path d="M374.006 142.184c-35 25.797-85.729 39.561-129.406 39.561-61.242 0-116.376-22.651-158.087-60.325-3.278-2.962-.341-7 3.591-4.693 45.015 26.191 100.673 41.947 158.166 41.947 38.775 0 81.43-8.022 120.65-24.67 5.925-2.516 10.88 3.88 5.086 8.18" style={{ fill: "#f90" }} /><path d="M388.557 125.536c-4.457-5.715-29.573-2.7-40.846-1.363-3.434.42-3.959-2.57-.865-4.719 20.003-14.078 52.827-10.015 56.654-5.296 3.828 4.745-.996 37.648-19.793 53.352-2.884 2.411-5.637 1.127-4.352-2.072 4.22-10.539 13.685-34.16 9.202-39.902" style={{ fill: "#f90" }} /><path d="M348.497 20.066V6.381c0-2.071 1.573-3.46 3.461-3.46h61.269c1.966 0 3.54 1.415 3.54 3.46V18.1c-.027 1.966-1.679 4.535-4.615 8.599l-31.749 45.329c11.798-.289 24.25 1.468 34.947 7.498 2.412 1.363 3.068 3.356 3.251 5.322V99.45c0 1.992-2.202 4.325-4.509 3.12-18.85-9.884-43.887-10.96-64.73.104-2.123 1.154-4.351-1.153-4.351-3.146V85.661c0-2.229.026-6.03 2.254-9.412L384.047 23.5h-32.01c-1.967 0-3.54-1.39-3.54-3.434m-223.498 85.388h-18.64c-1.783-.13-3.199-1.468-3.33-3.172V6.617c0-1.914 1.6-3.435 3.592-3.435h17.382c1.809.079 3.25 1.468 3.382 3.199v12.505h.34c4.536-12.086 13.056-17.722 24.54-17.722 11.666 0 18.954 5.636 24.198 17.722 4.509-12.086 14.76-17.722 25.744-17.722 7.813 0 16.36 3.224 21.577 10.46 5.899 8.049 4.693 19.741 4.693 29.992l-.026 60.378c0 1.913-1.6 3.46-3.592 3.46h-18.614c-1.862-.13-3.356-1.625-3.356-3.46V51.29c0-4.037.367-14.104-.524-17.932-1.39-6.423-5.558-8.232-10.959-8.232-4.51 0-9.228 3.015-11.142 7.839s-1.73 12.898-1.73 18.325v50.704c0 1.913-1.6 3.46-3.592 3.46h-18.614c-1.888-.13-3.356-1.625-3.356-3.46l-.026-50.704c0-10.67 1.757-26.374-11.483-26.374-13.397 0-12.872 15.31-12.872 26.374v50.704c0 1.913-1.6 3.46-3.592 3.46M469.514 1.164c27.66 0 42.629 23.752 42.629 53.954 0 29.18-16.543 52.329-42.629 52.329-27.16 0-41.947-23.753-41.947-53.352 0-29.782 14.97-52.931 41.947-52.931m.158 19.531c-13.738 0-14.603 18.719-14.603 30.386 0 11.692-.184 36.65 14.445 36.65 14.446 0 15.128-20.134 15.128-32.403 0-8.075-.341-17.723-2.78-25.378-2.097-6.66-6.265-9.255-12.19-9.255m78.336 84.759h-18.562c-1.861-.13-3.356-1.625-3.356-3.46l-.026-95.692c.157-1.756 1.704-3.12 3.592-3.12h17.277c1.625.079 2.962 1.18 3.33 2.674v14.63h.34c5.217-13.083 12.532-19.322 25.404-19.322 8.363 0 16.517 3.015 21.76 11.273 4.877 7.655 4.877 20.528 4.877 29.782v60.22c-.21 1.678-1.757 3.015-3.592 3.015h-18.693c-1.704-.13-3.12-1.39-3.303-3.015V50.478c0-10.461 1.206-25.772-11.667-25.772-4.535 0-8.704 3.042-10.775 7.656-2.621 5.846-2.962 11.666-2.962 18.116v51.516c-.026 1.913-1.652 3.46-3.644 3.46" /><use xlinkHref="#a" transform="translate(244.367)" /><path d="M55.288 59.758v-4.037c-13.475 0-27.71 2.884-27.71 18.771 0 8.049 4.168 13.502 11.325 13.502 5.243 0 9.936-3.225 12.898-8.468 3.67-6.45 3.487-12.506 3.487-19.768m18.798 45.434c-1.232 1.101-3.015 1.18-4.405.446-6.187-5.139-7.288-7.524-10.696-12.427-10.225 10.434-17.46 13.554-30.726 13.554-15.678 0-27.895-9.674-27.895-29.048 0-15.127 8.206-25.43 19.872-30.464 10.12-4.457 24.25-5.244 35.052-6.476v-2.412c0-4.43.341-9.674-2.254-13.501-2.281-3.435-6.633-4.85-10.46-4.85-7.106 0-13.45 3.644-14.997 11.194-.315 1.678-1.547 3.33-3.225 3.408l-18.09-1.94c-1.52-.34-3.198-1.573-2.778-3.906C7.652 6.853 27.446.246 45.169.246c9.07 0 20.92 2.412 28.078 9.28 9.07 8.469 8.206 19.768 8.206 32.064v29.048c0 8.73 3.618 12.558 7.026 17.277 1.206 1.678 1.468 3.697-.053 4.955-3.801 3.172-10.565 9.071-14.288 12.375z" id="a" /></svg>
            </a>
            <a href="https://www.uber.com" target="_blank" rel="noopener noreferrer" className="brand-logo opacity-50 hover:text-white hover:opacity-100 hover:transition-all cursor-pointer">
              <svg height="50" width="100" viewBox="0 0 97 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0208 0.859681V11.8158C16.0208 15.4744 14.3957 16.9937 10.5803 16.9937C6.76642 16.9937 5.13991 15.4744 5.13991 11.8158V0.379761H1.46656C1.14464 0.379761 0.984375 0.539949 0.984375 0.859681V11.9956C0.984375 18.1138 4.89952 20.253 10.5803 20.253C16.2626 20.253 20.1763 18.1138 20.1763 11.9956V0.379761H16.503C16.1824 0.379761 16.0208 0.539949 16.0208 0.859681Z" fill="currentColor"></path>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M69.2766 3.55875C69.5775 3.55875 69.7181 3.45892 69.8179 3.2387L70.8821 0.619553C70.9425 0.460023 70.8821 0.379761 70.7218 0.379761H55.9258C54.5411 0.379761 54.0195 0.799649 54.0195 1.73924V18.7532C54.0195 19.5532 54.4202 19.913 55.4844 19.913H69.2766C69.5775 19.913 69.7181 19.8129 69.8179 19.5934L70.8821 16.9738C70.9425 16.8139 70.8821 16.734 70.7218 16.734H58.0949V13.2752C58.0949 12.0755 58.7571 11.5355 60.5424 11.5355H66.0236C66.3259 11.5355 66.4651 11.4361 66.5663 11.2162L67.5897 8.69688C67.6501 8.53672 67.5897 8.45706 67.4294 8.45706H58.0949V3.55875H69.2766Z" fill="currentColor"></path>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M39.3809 16.7742H32.1312V13.1952C32.1312 11.9956 32.7933 11.456 34.5815 11.456H39.3809C41.6892 11.456 42.3317 12.3355 42.3317 14.1352C42.3317 15.9345 41.6892 16.7742 39.3809 16.7742ZM32.1312 3.51862H38.6175C40.7867 3.51862 41.3884 4.33196 41.3884 6.0177C41.3884 7.70372 40.7867 8.51712 38.6175 8.51712H32.1312V3.51862ZM43.2356 9.61654C44.841 8.77682 45.5031 7.19748 45.5031 5.33814C45.5031 1.01953 41.9704 0.379761 38.3167 0.379761H29.9649C28.5801 0.379761 28.0586 0.799649 28.0586 1.73924V18.7532C28.0586 19.5532 28.4592 19.913 29.5234 19.913H39.8026C43.677 19.913 46.4478 18.4136 46.4478 14.5149C46.4478 12.1757 45.4441 10.1963 43.2356 9.61654Z" fill="currentColor"></path>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M88.8654 9.4365H82.0402V3.51895H88.8654C91.4155 3.51895 91.9778 4.49835 91.9778 6.47774C91.9778 8.47694 91.4155 9.4365 88.8654 9.4365ZM96.534 19.5731L92.1381 12.0556C94.3269 11.496 96.0926 10.0567 96.0926 6.3978C96.0926 1.65964 93.1418 0.379761 88.2637 0.379761H79.8725C78.4864 0.379761 77.9648 0.799649 77.9648 1.73924V19.4332C77.9648 19.7528 78.1251 19.913 78.447 19.913H82.0402V14.2151C82.0402 13.0155 82.7024 12.4755 84.4891 12.4755H88.1035L92.0776 19.5934C92.1985 19.793 92.3194 19.913 92.6203 19.913H96.3541C96.6156 19.913 96.6156 19.6928 96.534 19.5731Z" fill="currentColor"></path>
              </svg>
            </a>
            <div className="brand-logo opacity-50 hover:opacity-100 hover:transition-all cursor-pointer">
              <a href="https://agoda.com" target="_blank" className="hover:text-white" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.1 30.1" width="100" height="32" preserveAspectRatio="xMidYMid meet">
                  <path d="M5.1 20.2c2.7 0 4.8 2.2 4.8 4.8 0 2.7-2.2 4.8-4.8 4.8C2.4 29.8.3 27.6.3 25c0-2.7 2.2-4.8 4.8-4.8" style={{ fill: "#ed2a28" }} />
                  <path d="M21.1 20.2c2.7 0 4.8 2.2 4.8 4.8 0 2.7-2.2 4.8-4.8 4.8-2.7 0-4.8-2.2-4.8-4.8 0-2.7 2.1-4.8 4.8-4.8" style={{ fill: "#f59e22" }} />
                  <path d="M37 20.2c2.7 0 4.8 2.2 4.8 4.8 0 2.7-2.2 4.8-4.8 4.8-2.7 0-4.8-2.2-4.8-4.8 0-2.7 2.2-4.8 4.8-4.8" style={{ fill: "#16ac5b" }} />
                  <path d="M53 20.2c2.7 0 4.8 2.2 4.8 4.8 0 2.7-2.2 4.8-4.8 4.8-2.7 0-4.8-2.2-4.8-4.8 0-2.7 2.1-4.8 4.8-4.8" style={{ fill: "#8252a1" }} />
                  <path d="M69 20.2c2.7 0 4.8 2.2 4.8 4.8 0 2.7-2.2 4.8-4.8 4.8-2.7 0-4.8-2.2-4.8-4.8-.1-2.7 2.1-4.8 4.8-4.8" style={{ fill: "#347fc2" }} />
                </svg>
              </a>
            </div>
            <div className="brand-logo opacity-50 hover:opacity-100 hover:transition-all cursor-pointer">
              <a href="https://www.unive.nl" target="_blank" rel="noopener noreferrer">
                <svg height="50" width="100" viewBox="0 0 83.873 25.929" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path d="m142.83 300.535.005-.356c.042-2.343 1.446-3.392 2.82-3.392.69 0 1.495.374 1.495 1.43 0 .7-.293 1.25-.873 1.637-.648.432-1.683.66-3.08.676zm3.28-7.806c-3.11 0-5.7.973-7.494 2.812-1.605 1.646-2.488 3.91-2.488 6.374 0 2.627.711 4.693 2.114 6.14 1.545 1.593 3.912 2.401 7.035 2.401 3.904 0 6.695-1.275 7.464-1.669l-1.654-3.832c-1.517.811-3.13 1.24-4.674 1.24-1.94 0-3.186-.798-3.422-2.19l-.067-.398.418-.003c2.983-.02 5.188-.418 6.742-1.218.87-.45 1.538-1.034 1.983-1.74.485-.767.73-1.71.73-2.802 0-1.705-.616-3.01-1.83-3.877-1.149-.822-2.783-1.238-4.857-1.238" style={{ fill: "#ff5a5f", fillRule: "evenodd", strokeWidth: 0.26458332 }} transform="translate(-69.188 -284.792)" />
                  <path d="M110.026 309.927h6.787v-2.75l-.607-.055c-.69-.076-.935-.373-.935-1.136v-12.728h-7.189v2.847l1.01.088c.69.076.934.373.934 1.137zm-40.573-13.774.762.057c.557.07.923.284.923 1.11v7.64c0 3.75 1.552 5.496 4.882 5.496 2.096 0 3.766-.888 4.703-2.499l.04-.07h.322v2.135h6.36v-2.766l-.767-.086c-.637-.076-.853-.373-.853-1.176v-12.736h-6.69v2.897l.6.055c.68.076.92.375.92 1.143v6.239c0 1.682-.96 2.812-2.388 2.812-1.576 0-1.892-.974-1.892-2.545v-10.601h-6.922zm30.385 14.038h6.921v-2.765l-.761-.057c-.558-.07-.924-.285-.924-1.11v-7.77c0-3.75-1.551-5.496-4.882-5.496-2.095 0-3.766.888-4.702 2.5l-.041.07h-.322v-2.136h-6.36v2.895l.767.086c.638.076.853.373.853 1.176v12.607h6.69v-2.765l-.599-.055c-.68-.077-.921-.376-.921-1.143v-6.37c0-1.682.96-2.812 2.388-2.812 1.576 0 1.892.974 1.892 2.545zm28.642-16.933v2.87l.718.053c.28.028.497.34.497.628a.6.6 0 0 1-.023.16l-2.485 7.8h-.242l-2.244-7.431c-.1-.339-.09-.58.03-.762.115-.174.328-.325.65-.363l.768-.085v-2.87h-8.805v2.851l.966.119c.4.047.633.18.752.468l4.651 13.23h5.913l4.362-12.709c.238-.714.534-.957 1.175-1.033l.701-.056v-2.87zm22.466-8.202c-4.188 0-6.937 2.117-6.243 6.35 4.161 0 6.243-2.09 6.243-6.35" style={{ fill: "#07be54", fillRule: "evenodd", strokeWidth: 0.26458332 }} transform="translate(-69.188 -284.792)" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="technology-section py-16 my-16">
        <div className="container mx-auto px-6 xl:px-72">
          <div className="flex flex-col md:flex-row items-center justify-between">

            {/* Lottie Animation */}
            <div className="md:w-2/5">
              <dotlottie-player 
                src="https://lottie.host/904a79dc-88e2-41e9-800b-bf230662a6b8/jWwqPjNakM.json" 
                background="transparent" 
                speed="0.6" 
                style={{ width: '100%', height: 'auto' }} 
                loop 
                autoplay>
              </dotlottie-player>
            </div>


            {/* Text Content */}
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Advanced Technology Solutions</h2>
              <p className="text-lg mb-8 text-gray-300 bg-[hsl(0_0%_0%_/_30%)] p-4 rounded-[12px]">
                Leveraging state-of-the-art technology in AI, machine learning, and big data analysis, we deliver innovative solutions enriched with Python, GPT, and Django capabilities. Our commitment to cutting-edge, no-code/low-code technologies and continuous improvement positions us at the forefront of digital transformation.
              </p>
              {/* <Link href="/technology" className="inline-block bg-primary-700 text-white px-6 py-3 rounded hover:bg-primary-800 transition-colors"> */}
                {/* Explore Our Tech */}
              {/* </Link> */}
            </div>
          </div>
        </div>
      </section>
      <section className="methodologies-section py-16 my-16">
        <div className="container mx-auto px-6 xl:px-72">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Text Content */}
            <div className="md:w-3/5 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Methodologies</h2>
              <p className="text-lg mb-8 text-gray-300 bg-[hsl(0_0%_0%_/_30%)] p-4 rounded-[12px]">
                Through Agile and Scrum methodologies, our consultancy delivers customized solutions and development strategies. Our approach integrates innovation with efficiency, catalyzing digital transformation and fostering business growth.
              </p>
              {/* <Link href="/methodologies" className="inline-block bg-primary-700 text-white px-6 py-3 rounded hover:bg-primary-800 transition-colors">
                Learn More
              </Link> */}
            </div>
            {/* Lottie Animation */}
            <div className="md:w-1/3">
              <dotlottie-player src="https://lottie.host/7456caee-747d-4baf-9508-339b285b4a97/3vB6UJ4om2.json" background="transparent" speed="1" style={{ width: "100%", height: "auto" }} loop autoplay>
              </dotlottie-player>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-[#00000033]">
        <style jsx global>{`
  .brand-logo {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    filter: brightness(0) invert(1); /* White color filter */
    transition: filter 0.3s;
  }

  .brand-logo:hover {
    filter: none; /* Original color on hover */
  }
`}</style>

        <div className="flex justify-center items-center flex-wrap gap-16 mx-16">
          <a
            href="https://openai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="brand-logo opacity-50 hover:opacity-100 hover:transition-all cursor-pointer w-24 h-24"
            style={{ backgroundImage: `url('/brands/openai.svg')` }}
          ></a>
          <a
            href="https://www.djangoproject.com"
            target="_blank"
            rel="noopener noreferrer"
            className="brand-logo opacity-50 hover:opacity-100 hover:transition-all cursor-pointer w-24 h-24"
            style={{ backgroundImage: `url('/brands/django.svg')` }}
          ></a>
          <a
            href="https://www.typescriptlang.org"
            target="_blank"
            rel="noopener noreferrer"
            className="brand-logo opacity-50 hover:opacity-100 hover:transition-all cursor-pointer w-24 h-24"
            style={{ backgroundImage: `url('/brands/typescript.svg')` }}
          ></a>
          <a
            href="https://aws.amazon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="brand-logo opacity-50 hover:opacity-100 hover:transition-all cursor-pointer w-14 h-14"
            style={{ backgroundImage: `url('/brands/aws.svg')` }}
          ></a>
          <a
            href="https://kubernetes.io"
            target="_blank"
            rel="noopener noreferrer"
            className="brand-logo opacity-50 hover:opacity-100 hover:transition-all cursor-pointer w-24 h-24"
            style={{ backgroundImage: `url('/brands/kubernetes.svg')` }}
          ></a>
        </div>

      </section>
      <section className="contact-section py-16 my-16">
        <div className="container mx-auto px-6 xl:px-72">
          <div className="flex flex-col md:flex-row items-center justify-between">

            <div className="md:w-2/5 relative right-24 bottom-16">
              <dotlottie-player 
                src="https://lottie.host/b4b844f5-bdca-480d-b19d-ff04a27d4213/CFrtNTFf04.json" 
                background="transparent" 
                speed="0.6" 
                style={{ width: '100%', height: 'auto' }} 
                loop 
                autoplay>
              </dotlottie-player>
            </div>

            <ContactForm/>

          </div>
        </div>
      </section>
    </section>
  )
}
