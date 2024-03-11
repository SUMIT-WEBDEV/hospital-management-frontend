import React, { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FiX, FiMenu } from "react-icons/fi";

import Logo from "../../Assets/img/logo-login.svg";
// import User from "../../Assets/user/user.jpg";
import User from "../../Assets/user/profile.webp";
import { DetailsPatients, patientSignout } from "../../action/PatientAction";
import { useDispatch, useSelector } from "react-redux";
import { Url } from "../../constant.js/PatientConstant";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PatientNav = () => {
  const dispatch = useDispatch();
  const myPatientId = useSelector((state) => state.patientId);
  const [user, setUser] = useState({ name: "", email: "", photo: "" });
  const { patId } = myPatientId;

  // const user = {
  //   name: patientInfo.user.name,
  //   email: patientInfo.user.email,
  //   imageUrl: patientInfo.user.photo,
  // };

  // useEffect(() => {
  // const patientInfo = JSON.parse(localStorage.getItem("patientData"));
  // console.log("patientInfo-->", patientInfo);

  // setUser({
  //   ...patientInfo.user,
  //   photo:
  //     "https://www.bonifica-auto.it/wp-content/uploads/2019/10/avatar-uomo.jpg",
  // });
  // }, []);

  const patientSignin = useSelector((state) => state.patientSignin);
  const doctorSignin = useSelector((state) => state.doctorSignin);
  const { patientInfo } = patientSignin;

  const patientDetail = useSelector((state) => state.patientDetails);
  const { loading, patient } = patientDetail;

  const patDetail = patient?.data;
  console.log("patDetail-->", patDetail);
  const { doctorInfo } = doctorSignin;
  const activeUser = localStorage.getItem("activeUser");
  let navigation;

  if (doctorInfo && activeUser == "doctor") {
    navigation = [
      {
        name: "Dashboard",
        href: "/userrole/:roleid/dashboard/doctor/",
        current: true,
      },
      {
        name: "All Enrolments",
        href: `/userrole/:roleid/dashboard/patient/all/enrolments/`,
        current: true,
      },
      {
        name: "My Info",
        href: `/userrole/:roleid/dashboard/patient/myinfo/`,
        current: true,
      },
    ];
  } else if (patientInfo) {
    navigation = [
      {
        name: "Dashboard",
        href: "/userrole/:roleid/dashboard/patient/mydata",
        current: true,
      },
      // {
      //   name: "Prescriptions",
      //   href: "/userrole/:roleid/dashboard/patient/prescriptions/",
      //   current: true,
      // },
      // {
      //   name: "Appointment",
      //   href: "/userrole/:roleid/dashboard/patient/appointment/",
      //   current: true,
      // },
    ];
  }

  const hello = () => {
    //  console.log('heysiri');
    dispatch(patientSignout());
  };

  const userNavigation = [
    {
      name: "Profile",
      href: "/userrole/:roleid/dashboard/patient/profile/",
    },
    // { name: "Settings", href: "#" },
    { name: "Sign Out", fun: hello },
  ];

  useEffect(() => {
    dispatch(DetailsPatients(patId));
  }, []);

  // console.log("dispatch", patDetail);

  return (
    <>
      <Disclosure as="nav" className="navbar__BG">
        {({ open }) => (
          <>
            <div className="navbar__Container-Desk">
              <div className="navbar__Flex--Box">
                <div className="navbar__Flex--Items">
                  <div className="navbar__Flex--LogoBox">
                    <img
                      className="navbar__Flex--LogoBox-Logo"
                      src={Logo}
                      alt="Your Company"
                    />
                  </div>
                  <div className="navbar__Hidden-MD">
                    <div className="navbar__Flex--NavItems">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "navbar__Flex--NavItems-Anchor_BG"
                              : "navbar__Flex--NavItems-Anchor_Hover",
                            "navbar__Flex--NavItems-Anchor"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="navbar__Hidden-MD">
                  <div className="navbar__RightBox">
                    {/* Profile dropdown */}
                    <Menu as="div" className="navbar__ProfileBox">
                      <div>
                        <Menu.Button className="navbar__ProfileBox--Btn">
                          <span className="navbar__RightBox--Btn-Span">
                            Open user menu
                          </span>
                          <img
                            className="navbar__ProfileBox--Btn-Img"
                            // src={patientInfo?.user.photo} //s
                            src={
                              patDetail?.photo
                                ? patDetail?.photo
                                : patientInfo?.user.photo
                                ? patientInfo?.user.photo
                                : User
                            }
                            // src={patDetail?.photo}
                            alt=""
                          />
                          <div className="text-white pl-3 text-sm">
                            {patDetail ? (
                              <h1>Patient Name : {patDetail?.name}</h1>
                            ) : (
                              ""
                            )}
                          </div>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="navbar__ProfileBox--ItemsBox">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  onClick={item.fun}
                                  href={item.href}
                                  className={classNames(
                                    active
                                      ? "navbar__ProfileBox--Item-Active"
                                      : "",
                                    "navbar__ProfileBox--Item"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="navbar__Menu-Hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="navbar__Menu-Btn">
                    <span className="navbar__RightBox--Btn-Span">
                      Open main menu
                    </span>
                    {open ? (
                      <FiX className="navbar__Menu-Icon" aria-hidden="true" />
                    ) : (
                      <FiMenu
                        className="navbar__Menu-Icon"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="navbar__Menu-Hide">
              <div className="navbar__Menu-Mobile-Box">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "navbar__Menu-Mobile--Items-BG"
                        : "navbar__Menu-Mobile--Items-Hover",
                      "navbar__Menu-Mobile--Items"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="navbar__Border-Mobile">
                <div className="navbar__FlexBox-Mobile">
                  <div className="navbar__Flex-ImgBox-Mobile">
                    <img
                      className="navbar__Flex-Img-Mobile"
                      src={user?.photo}
                      alt=""
                    />
                  </div>
                  <div className="navbar__User-List-Mobile">
                    <div className="navbar__User-Name-Mobile">{user?.name}</div>
                    <div className="navbar__User-Email-Mobile">
                      {user?.email}
                    </div>
                  </div>
                </div>
                <div className="navbar__List-Items-Mobile">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      onClick={item.fun}
                      className="navbar__List-Item-Mobile"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default PatientNav;
