
export const getNavItemsByRole = (role: string) => {

    const adminNavItems = [
        {
            title: "Dashboard",
            url: "/admin",
            icon: "LayoutDashboard" 
        },
        {
            title: "Users",
            url: "/admin/users",
            icon: "Users"
        },
        {
            title: "Destination",
            url: "/admin/destination",
            icon: "MapPinCheckInside"
        },
        {
            title: "Trips",
            url: "/admin/trips",
            icon: "TentTree"
        },
        {
            title:"Profile",
            url:"/profile",
            icon:"User"
        }
    ];

    const userNavItems = [
        {
            title: "Dashboard",
            url: "/user",
            icon: "LayoutDashboard" 
        },
        {
            title: "Trips",
            url: "/user/trips",
            icon: "TentTree"
        },
         {
            title:"Profile",
            url:"/profile",
            icon:"User"
        }
    ];

    switch (role) {
        case "admin":
            return [...adminNavItems];
        case "user":
            return [...userNavItems];
        default:
            return [];
    }
};
