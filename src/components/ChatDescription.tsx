import React, { useState } from 'react';
import Globe from '../assets/images/Globe.png';
import Call from '../assets/images/Call.png';
import Location from '../assets/images/Location.png';
import Message from '../assets/images/Message.png';

const ChatDescription = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const contactInfo = {
    phone: '+123456789',
    email: 'contact@clinic.com',
    website: 'https://www.clinic.com',
    address: '123 Clinic St, City, Country',
  };

  const data = {
    tags: [
      'Eetstornis',
      'Autisme Spectrum Stoornis',
      'Verslaving',
      'Beeldende Therapie',
      'CGT',
      'EMDR',
    ],
    ages: ['0-6 jaar', '6-12 jaar', '12-18 jaar', '18-23 jaar'],
  };

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleModalClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="bg-light_gray rounded-t-3xl border border-border_color pt-5">
      <p className="font-bold lg:text-[32px] text-xl lg:px-4 px-2 text-header_color text-start">
        Trauma Clinic XYZ
      </p>
      <div className="flex flex-col lg:gap-4 gap-2 rounded-lg lg:p-4 p-2">
        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag, index) => (
            <span
              key={index}
              className={`tags-style ${
                tag.includes('Therapie') || tag === 'CGT' || tag === 'EMDR'
                  ? 'bg-pastel_blue'
                  : 'bg-pale_orange'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {data.ages.map((age, index) => (
            <span key={index} className="tags-style bg-dark_gray">
              {age}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-white pt-4 pl-4 pr-2 rounded-t-3xl border-t text-start border-border_color flex flex-col">
        <p className="font-bold lg:text-xl text-lg text-header_color mb-2">
          Description
        </p>
        <p className="text-[#555555] lg:text-[16px] text-sm font-normal lg:mb-10 mb-3 leading-7">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          iaculis mi fringilla mauris <br /> ornare, in accumsan enim volutpat.
          Morbi vulputate libero rutrum neque dapibus suscipit. <br /> In
          vehicula, magna vitae ornare aliquam, nulla quam suscipit lectus, non
          consectetur ligula <br /> enim at sem. Maecenas sit amet nisl non
          tortor lacinia lobortis a at risus.
        </p>
        <button
          className="bg-[#0155A6] text-white lg:text-[16px] text-sm font-medium p-3 mt-auto mb-2 self-end"
          onClick={openModal}
        >
          Lees meer
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center p-4"
          onClick={handleModalClose}
        >
          <div
            className="bg-light_gray rounded-lg border border-border_color w-[90%] sm:w-3/4 lg:w-1/2 max-w-4xl max-h-screen overflow-y-auto py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-bold lg:text-[32px] text-xl lg:px-4 px-2 text-header_color text-start">
              Trauma Clinic XYZ
            </p>
            <div className="flex flex-col lg:gap-4 gap-2 rounded-lg lg:p-4 p-2">
              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`tags-style ${
                      tag.includes('Therapie') ||
                      tag === 'CGT' ||
                      tag === 'EMDR'
                        ? 'bg-pastel_blue'
                        : 'bg-pale_orange'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {data.ages.map((age, index) => (
                  <span key={index} className="tags-style bg-dark_gray">
                    {age}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white pt-4 pl-4 pr-2 rounded-t-3xl border-t text-start border-border_color flex flex-col lg:grid grid-cols-[1fr_1px_2fr] gap-4">
              {/* Contact details */}
              <div className="pr-10">
                <p className="font-bold lg:text-xl text-lg text-header_color mb-5">
                  Contact details
                </p>
                <div className="flex flex-col gap-y-5 lg:text-base text-sm">
                  {contactInfo.phone && (
                    <div className="flex items-center gap-2">
                      <img
                        src={Call}
                        className="w-6 h-6 object-cover"
                        alt="Phone"
                      />
                      <span>{contactInfo.phone}</span>
                    </div>
                  )}
                  {contactInfo.email && (
                    <div className="flex items-center gap-2">
                      <img
                        src={Message}
                        className="w-6 h-6 object-cover"
                        alt="Email"
                      />
                      <span>{contactInfo.email}</span>
                    </div>
                  )}
                  {contactInfo.website && (
                    <div className="flex items-center gap-2">
                      <img
                        src={Globe}
                        className="w-6 h-6 object-cover"
                        alt="Website"
                      />
                      <span>{contactInfo.website}</span>
                    </div>
                  )}
                  {contactInfo.address && (
                    <div className="flex items-center gap-2">
                      <img
                        src={Location}
                        className="w-6 h-6 object-cover"
                        alt="Address"
                      />
                      <span>{contactInfo.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="bg-gray-300 lg:w-[1px] lg:h-[85%] w-full h-[1px]"></div>

              {/* Description */}
              <div className="flex flex-col px-5">
                <p className="font-bold lg:text-xl text-lg text-header_color mb-5">
                  Description
                </p>
                <p className="text-[#555555] lg:text-base text-sm font-normal lg:mb-10 mb-3 leading-7">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque iaculis mi fringilla mauris ornare, in accumsan enim
                  volutpat. Morbi vulputate libero rutrum neque dapibus
                  suscipit. In vehicula, magna vitae ornare aliquam, nulla quam
                  suscipit lectus, non consectetur ligula enim at sem. Maecenas
                  sit amet nisl non tortor lacinia lobortis a at risus.
                </p>
                <button className="bg-[#0155A6] text-white lg:text-[16px] text-sm font-medium p-3 mt-auto mb-2 self-end">
                  Bezoek website
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatDescription;
