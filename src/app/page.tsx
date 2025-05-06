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
          <p className="max-w-2xl mb-6 lg:mb-8 md:text-lg lg:text-xl text-gray-300">
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
            <a href="https://www.nike.com" target="_blank" rel="noopener noreferrer" className="brand-logo opacity-50 hover:text-white hover:opacity-100 hover:transition-all cursor-pointer">
              <svg height="50" width="70" viewBox="0 0 74 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.33785 27.8054C6.1633 27.7158 4.38323 27.098 2.99202 25.9508C2.7267 25.7317 2.09357 25.0746 1.88159 24.7975C1.31724 24.0611 0.932589 23.3445 0.677089 22.5494C-0.110465 20.1021 0.295245 16.8903 1.83666 13.3657C3.15627 10.3481 5.19184 7.35521 8.74496 3.21015C9.26719 2.60021 10.8255 0.816406 10.8367 0.816406C10.8395 0.816406 10.7553 0.969084 10.6486 1.155C9.72485 2.76062 8.93448 4.65188 8.5035 6.28919C7.81141 8.9164 7.89564 11.171 8.74777 12.9192C9.33598 14.1237 10.3439 15.1669 11.4782 15.7435C13.4633 16.7528 16.3692 16.8362 19.9167 15.9878C20.161 15.9291 32.2677 12.5938 46.8213 8.57585C61.375 4.55756 73.2838 1.27251 73.2852 1.27521C73.2894 1.27869 39.475 16.2951 21.92 24.0855C19.1404 25.3189 18.3978 25.6304 17.0908 26.1066C13.7497 27.3241 10.7567 27.9052 8.33785 27.8054Z" fill="currentColor"></path>
              </svg>
            </a>
            <a href="https://www.uber.com" target="_blank" rel="noopener noreferrer" className="brand-logo opacity-50 hover:text-white hover:opacity-100 hover:transition-all cursor-pointer">
              <svg height="50" width="100" viewBox="0 0 97 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0208 0.859681V11.8158C16.0208 15.4744 14.3957 16.9937 10.5803 16.9937C6.76642 16.9937 5.13991 15.4744 5.13991 11.8158V0.379761H1.46656C1.14464 0.379761 0.984375 0.539949 0.984375 0.859681V11.9956C0.984375 18.1138 4.89952 20.253 10.5803 20.253C16.2626 20.253 20.1763 18.1138 20.1763 11.9956V0.379761H16.503C16.1824 0.379761 16.0208 0.539949 16.0208 0.859681Z" fill="currentColor"></path>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M69.2766 3.55875C69.5775 3.55875 69.7181 3.45892 69.8179 3.2387L70.8821 0.619553C70.9425 0.460023 70.8821 0.379761 70.7218 0.379761H55.9258C54.5411 0.379761 54.0195 0.799649 54.0195 1.73924V18.7532C54.0195 19.5532 54.4202 19.913 55.4844 19.913H69.2766C69.5775 19.913 69.7181 19.8129 69.8179 19.5934L70.8821 16.9738C70.9425 16.8139 70.8821 16.734 70.7218 16.734H58.0949V13.2752C58.0949 12.0755 58.7571 11.5355 60.5424 11.5355H66.0236C66.3259 11.5355 66.4651 11.4361 66.5663 11.2162L67.5897 8.69688C67.6501 8.53672 67.5897 8.45706 67.4294 8.45706H58.0949V3.55875H69.2766Z" fill="currentColor"></path>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M39.3809 16.7742H32.1312V13.1952C32.1312 11.9956 32.7933 11.456 34.5815 11.456H39.3809C41.6892 11.456 42.3317 12.3355 42.3317 14.1352C42.3317 15.9345 41.6892 16.7742 39.3809 16.7742ZM32.1312 3.51862H38.6175C40.7867 3.51862 41.3884 4.33196 41.3884 6.0177C41.3884 7.70372 40.7867 8.51712 38.6175 8.51712H32.1312V3.51862ZM43.2356 9.61654C44.841 8.77682 45.5031 7.19748 45.5031 5.33814C45.5031 1.01953 41.9704 0.379761 38.3167 0.379761H29.9649C28.5801 0.379761 28.0586 0.799649 28.0586 1.73924V18.7532C28.0586 19.5532 28.4592 19.913 29.5234 19.913H39.8026C43.677 19.913 46.4478 18.4136 46.4478 14.5149C46.4478 12.1757 45.4441 10.1963 43.2356 9.61654Z" fill="currentColor"></path>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M88.8654 9.4365H82.0402V3.51895H88.8654C91.4155 3.51895 91.9778 4.49835 91.9778 6.47774C91.9778 8.47694 91.4155 9.4365 88.8654 9.4365ZM96.534 19.5731L92.1381 12.0556C94.3269 11.496 96.0926 10.0567 96.0926 6.3978C96.0926 1.65964 93.1418 0.379761 88.2637 0.379761H79.8725C78.4864 0.379761 77.9648 0.799649 77.9648 1.73924V19.4332C77.9648 19.7528 78.1251 19.913 78.447 19.913H82.0402V14.2151C82.0402 13.0155 82.7024 12.4755 84.4891 12.4755H88.1035L92.0776 19.5934C92.1985 19.793 92.3194 19.913 92.6203 19.913H96.3541C96.6156 19.913 96.6156 19.6928 96.534 19.5731Z" fill="currentColor"></path>
              </svg>
            </a>
            <div className="brand-logo opacity-50 hover:text-white hover:opacity-100 hover:transition-all cursor-pointer">
              <a href="https://stripe.com" target="_blank" className="hover:text-white" rel="noopener noreferrer">
                <svg height="50" width="100" viewBox="0 0 72 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.25736 12.9639C5.25736 12.1569 5.89775 11.8465 6.94187 11.8465C8.4454 11.8465 10.3248 12.3225 11.8283 13.171V8.3077C10.1995 7.62482 8.57069 7.35579 6.94187 7.35579C2.93246 7.35579 0.273438 9.54946 0.273438 13.2125C0.273438 18.9239 7.76324 18.0135 7.76324 20.4762C7.76324 21.4279 6.98363 21.7384 5.86991 21.7384C4.24108 21.7384 2.15285 21.0347 0.496183 20.0829V25.0081C2.31991 25.8359 4.17148 26.1877 5.86991 26.1877C9.97677 26.1877 12.8028 24.0563 12.8028 20.3519C12.775 14.185 5.25736 15.2817 5.25736 12.9639ZM18.5942 3.21698L13.7774 4.29301L13.7634 20.8692C13.7634 23.9321 15.9491 26.1877 18.8727 26.1877C20.4876 26.1877 21.6709 25.8772 22.3252 25.5048V21.3037C21.6987 21.5729 18.5803 22.5247 18.5803 19.4619V12.1155H22.3252V7.70762H18.5803L18.5942 3.21698ZM28.4507 9.23894L28.1444 7.70762H23.8844V25.8151H28.8127V13.5435C29.9681 11.9501 31.945 12.2398 32.5576 12.4673V7.70762C31.9311 7.45924 29.6201 7.00395 28.4507 9.23894ZM33.7548 7.70762H38.7109V25.8151H33.7548V7.70762ZM33.7548 6.13484L38.7109 5.01734V0.816406L33.7548 1.91324V6.1347V6.13484ZM49.0128 7.35579C47.0778 7.35579 45.8248 8.3077 45.1427 8.97004L44.8781 7.68696H40.5485V31.8164L45.4768 30.7197L45.4907 24.8632C46.2007 25.4012 47.2448 26.1669 48.985 26.1669C52.5211 26.1669 55.737 23.187 55.737 16.627C55.7091 10.6255 52.4654 7.35579 49.0128 7.35579ZM47.8295 21.6142C46.6601 21.6142 45.964 21.1797 45.4907 20.6416L45.4768 12.9639C45.9919 12.3639 46.7019 11.9501 47.8295 11.9501C49.6115 11.9501 50.8644 14.0607 50.8644 16.7717C50.8644 19.5448 49.6393 21.6142 47.8295 21.6142ZM71.2734 16.8338C71.2734 11.5361 68.8232 7.35579 64.1595 7.35579C59.454 7.35579 56.614 11.5362 56.614 16.7925C56.614 23.0214 59.9691 26.1669 64.786 26.1669C67.1248 26.1669 68.9068 25.6082 70.2432 24.8218V20.6829C68.9068 21.3866 67.3615 21.8213 65.4125 21.8213C63.5052 21.8213 61.8068 21.1176 61.584 18.6756H71.2317C71.2317 18.4065 71.2734 17.3304 71.2734 16.8338ZM61.5283 14.8679C61.5283 12.5295 62.8927 11.5568 64.1317 11.5568C65.3428 11.5568 66.6236 12.5295 66.6236 14.8679H61.5283Z" fill="currentColor"></path>
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
              <p className="text-lg mb-8 text-gray-300">
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
              <p className="text-lg mb-8 text-gray-300">
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
