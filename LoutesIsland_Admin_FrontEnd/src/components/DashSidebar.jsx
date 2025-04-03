import { Sidebar, Dropdown, Avatar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiOutlineUserGroup,
  HiUser,
  HiMenu,
  HiOutlineStar,
} from "react-icons/hi";
import {
  FaHotel,
  FaMapMarkerAlt,
  FaPlaneDeparture,
  FaImages,
} from "react-icons/fa";
import { MdDirectionsCar, MdAssignment } from "react-icons/md";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const menuItems = [
    currentUser.isAdmin && {
      name: "Dashboard",
      path: "dash",
      icon: HiChartPie,
    },
    {
      name: "Profile",
      path: "profile",
      icon: HiUser,
    },
    currentUser.isAdmin && {
      name: "Hotels",
      path: "hotels",
      icon: FaHotel,
    },
    currentUser.isAdmin && {
      name: "Destinations",
      path: "destinations",
      icon: FaMapMarkerAlt,
    },
    currentUser.isAdmin && {
      name: "Tours",
      path: "tours",
      icon: FaPlaneDeparture,
    },
    currentUser.isAdmin && {
      name: "Gallery",
      path: "gallery",
      icon: FaImages,
    },
    !currentUser.isAdmin && {
      name: "My Travel Plans",
      path: "travel-plans",
      icon: FaMapMarkerAlt,
    },
    currentUser.isAdmin && {
      name: "Vehicles",
      path: "vehicles",
      icon: MdDirectionsCar,
    },
    currentUser.isAdmin && {
      name: "Users",
      path: "users",
      icon: HiOutlineUserGroup,
    },
    currentUser.isAdmin && {
      name: "Reviews",
      path: "reviews",
      icon: HiOutlineStar,
    },
  ].filter(Boolean);

  const handleTabChange = (path) => {
    navigate(`/dashboard?tab=${path}`);
  };

  if (isMobile) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <Dropdown
          label={
            <div className="flex items-center gap-2 text-gray-700">
              <HiMenu className="text-xl" />
              <span>{menuItems.find((item) => item.path === tab)?.name || "Menu"}</span>
            </div>
          }
          className="w-full"
          color="light"
        >
          {menuItems.map((item) => (
            <Dropdown.Item
              key={item.path}
              onClick={() => handleTabChange(item.path)}
              icon={() => <item.icon className="text-blue-500" />}
              className={tab === item.path ? "bg-blue-50" : "hover:bg-gray-50"}
            >
              {item.name}
            </Dropdown.Item>
          ))}
          <Dropdown.Item
            onClick={handleSignout}
            icon={() => <HiArrowSmRight className="text-red-500" />}
            className="hover:bg-red-50"
          >
            Sign Out
          </Dropdown.Item>
        </Dropdown>
      </div>
    );
  }

  return (
    <div className="w-full md:w-64 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          {currentUser.profilePicture ? (
            <Avatar img={currentUser.profilePicture} rounded size="md" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {currentUser.username?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
          <div>
            <h5 className="text-gray-800 font-medium truncate">{currentUser.username}</h5>
            <p className="text-gray-500 text-sm">{currentUser.isAdmin ? "Administrator" : "User"}</p>
          </div>
        </div>
      </div>
      
      <Sidebar className="w-full bg-transparent border-none">
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col gap-1 py-2">
            {menuItems.map((item) => (
              <Sidebar.Item
                key={item.path}
                as={Link}
                to={`/dashboard?tab=${item.path}`}
                active={tab === item.path || (!tab && item.path === "dash")}
                icon={() => (
                  <div className={`p-2 rounded-lg ${tab === item.path ? "bg-blue-100" : "bg-gray-100"}`}>
                    <item.icon className={`${tab === item.path ? "text-blue-500" : "text-gray-600"}`} />
                  </div>
                )}
                className={`transition-all duration-200 hover:bg-gray-100 ${
                  tab === item.path ? "bg-blue-50 border-l-4 border-blue-500" : ""
                }`}
              >
                <span className={tab === item.path ? "text-blue-600" : "text-gray-700"}>
                  {item.name}
                </span>
              </Sidebar.Item>
            ))}
            <div className="mt-4 border-t border-gray-200 pt-4">
              <Sidebar.Item
                icon={() => (
                  <div className="p-2 rounded-lg bg-red-100">
                    <HiArrowSmRight className="text-red-500" />
                  </div>
                )}
                className="cursor-pointer hover:bg-red-50 transition-colors duration-200"
                onClick={handleSignout}
              >
                <span className="text-red-600">Sign Out</span>
              </Sidebar.Item>
            </div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}