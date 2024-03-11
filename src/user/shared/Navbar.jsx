import React, { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FiX, FiMenu } from "react-icons/fi";
import { Url } from "../../constant.js/PatientConstant";
import Logo from "../../Assets/img/logo-login.svg";
import User from "../../Assets/user/profile.webp";
import { useDispatch, useSelector } from "react-redux";
import { doctorSignout } from "../../action/PatientAction";
import axios from "axios";

// const user = {
//   name: doctorInfo?.user.name,
//   email: doctorInfo?.user.email,
//   imageUrl: doctorInfo?.user.photo,
// };

const navigation = [
  {
    name: "Dashboard",
    href: "/userrole/:roleid/dashboard/doctor/",
    current: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  // const [docImage, setDocImage] = useState("");
  // const [user, setUser] = useState({ name: "", email: "", photo: "" });
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const doctorInfo = JSON.parse(localStorage.getItem("doctorInfo"));

  //   setUser({
  //     ...doctorInfo.user,
  //     photo: doctorInfo
  //       ? doctorInfo?.user.photo
  //       : "https://img.freepik.com/free-icon/doctor_318-487703.jpg",
  //   });
  // }, []);

  const hello = () => {
    dispatch(doctorSignout());
  };

  const doctorSignin = useSelector((state) => state.doctorSignin);
  const { user } = doctorSignin.doctorInfo;

  console.log("user -----", user);

  const userNavigation = [
    {
      name: "Your Profile",
      href: "/userrole/:roleid/dashboard/doctor/profile/",
    },
    { name: "Sign Out", fun: hello },
  ];

  // const getDocProfile = () => {
  //   return axios
  //     .get(`${Url}/profile/doctor`, {
  //       headers: {
  //         Authorization: `Bearer ${doctorInfo.token}`,
  //       },
  //     })
  //     .then(function (response) {
  //       const res = response.data;
  //       // setDocImage(res?.data?.doctor?.photo);
  //       // console.log("response--->", response.data.data.doctor.photo);
  //       setDocImage(
  //         "https://i.pinimg.com/474x/5d/69/42/5d6942c6dff12bd3f960eb30c5fdd0f9.jpg"
  //       );
  //     });
  // };

  // useEffect(() => {
  //   getDocProfile();
  // }, []);

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
                            // src={User}
                            src={user?.photo ? user?.photo : User}
                            alt="img"
                          />
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
                      src={user?.photo ? user?.photo : User}
                      alt=""
                    />
                  </div>
                  <div className="navbar__User-List-Mobile">
                    <div className="navbar__User-Name-Mobile">{user.name}</div>
                    <div className="navbar__User-Email-Mobile">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="navbar__List-Items-Mobile">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      onClick={item.fun}
                      href={item.href}
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

export default Navbar;
