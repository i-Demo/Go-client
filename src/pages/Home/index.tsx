import { useState, useEffect } from "react";
import nike from "~/assets/images/nike.png";
import check from "~/assets/images/check.png";
import minus from "~/assets/images/minus.png";
import plus from "~/assets/images/plus.png";
import trash from "~/assets/images/trash.png";
import { LOCAL_STORAGE_CART_NAME } from "~/variables";
// import { apiUrl } from "~/variables";
// import axios from "axios";

interface Cart {
    id: number;
    image: string;
    price: number;
    name: string;
    color: string;
    num: number;
}

interface Shoe {
    id: number;
    image: string;
    price: number;
    name: string;
    color: string;
    description: string;
}

function Home() {
    const shoes = [
        {
            id: 1,
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/air-zoom-pegasus-36-mens-running-shoe-wide-D24Mcz-removebg-preview.png",
            name: "Nike Air Zoom Pegasus 36",
            description:
                "The iconic Nike Air Zoom Pegasus 36 offers more cooling and mesh that targets breathability across high-heat areas. A slimmer heel collar and tongue reduce bulk, while exposed cables give you a snug fit at higher speeds.",
            price: 108.97,
            color: "#e1e7ed",
        },
        {
            id: 2,
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/air-zoom-pegasus-36-shield-mens-running-shoe-24FBGb__1_-removebg-preview.png",
            name: "Nike Air Zoom Pegasus 36 Shield",
            description:
                "The Nike Air Zoom Pegasus 36 Shield gets updated to conquer wet routes. A water-repellent upper combines with an outsole that helps create grip on wet surfaces, letting you run in confidence despite the weather.",
            price: 89.97,
            color: "#4D317F",
        },
        {
            id: 3,
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/cruzrone-unisex-shoe-T2rRwS-removebg-preview.png",
            name: "Nike CruzrOne",
            description:
                "Designed for steady, easy-paced movement, the Nike CruzrOne keeps you going. Its rocker-shaped sole and plush, lightweight cushioning let you move naturally and comfortably. The padded collar is lined with soft wool, adding luxury to every step, while mesh details let your foot breathe. There’s no finish line—there’s only you, one step after the next.",
            price: 100.97,
            color: "#E8D026",
        },
        {
            id: 4,
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/epic-react-flyknit-2-mens-running-shoe-2S0Cn1-removebg-preview.png",
            name: "Nike Epic React Flyknit 2",
            description:
                "The Nike Epic React Flyknit 2 takes a step up from its predecessor with smooth, lightweight performance and a bold look. An updated Flyknit upper conforms to your foot with a minimal, supportive design. Underfoot, durable Nike React technology defies the odds by being both soft and responsive, for comfort that lasts as long as you can run.",
            price: 89.97,
            color: "#FD584A",
        },
        {
            id: 5,
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/odyssey-react-flyknit-2-mens-running-shoe-T3VG7N-removebg-preview.png",
            name: "Nike Odyssey React Flyknit 2",
            description:
                "The Nike Odyssey React Flyknit 2 provides a strategic combination of lightweight Flyknit construction and synthetic material for support. Underfoot, Nike React cushioning delivers a soft, springy ride for a route that begs to be crushed.",
            price: 71.97,
            color: "#D4D7D6",
        },
        {
            id: 6,
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/react-infinity-run-flyknit-mens-running-shoe-RQ484B__2_-removebg-preview.png",
            name: "Nike React Infinity Run Flyknit",
            description:
                "A pioneer in the running shoe frontier honors the original pioneer of running culture with the Nike React Infinity Run Flyknit. Blue Ribbon Track Club-inspired details pay homage to the haven that was created before running was even popular. This running shoe is designed to help reduce injury and keep you on the run. More foam and improved upper details provide a secure and cushioned feel.",
            price: 160.0,
            color: "#F2F5F4",
        },
        {
            id: 7,
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/react-miler-mens-running-shoe-DgF6nr-removebg-preview.png",
            name: "Nike React Miler",
            description:
                "The Nike React Miler gives you trusted stability for miles with athlete-informed performance. Made for dependability on your long runs, its intuitive design offers a locked-in fit and a durable feel.",
            price: 130.0,
            color: "#22AFDC",
        },
        {
            id: 8,
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/renew-ride-mens-running-shoe-JkhdfR-removebg-preview.png",
            name: "Nike Renew Ride",
            description:
                "The Nike Renew Ride helps keep the committed runner moving with plush cushioning. Firm support at the outsole helps you maintain stability no matter the distance.",
            price: 60.97,
            color: "#B50320",
        },
        {
            id: 9,
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/vaporfly-4-flyknit-running-shoe-v7G3FB-removebg-preview.png",
            name: "Nike Vaporfly 4% Flyknit",
            description:
                "Built to meet the exacting needs of world-class marathoners, Nike Vaporfly 4% Flyknit is designed for record-breaking speed. The Flyknit upper delivers breathable support, while the responsive foam and full-length plate provide incredible energy return for all 26.2.",
            price: 187.97,
            color: "#3569A1",
        },
        {
            id: 10,
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/zoom-fly-3-premium-mens-running-shoe-XhzpPH-removebg-preview.png",
            name: "Nike Zoom Fly 3 Premium",
            description:
                "Inspired by the Vaporfly, the Nike Zoom Fly 3 Premium gives distance runners race-day comfort and durability. The power of a carbon fiber plate keeps you in the running mile after mile.",
            price: 160.0,
            color: "#54D4C9",
        },
    ];

    // const [shoes, setShoes] = useState<Shoe[]>([]);
    const [cart, setCart] = useState<Cart[]>([]);
    const [total, setTotal] = useState(0);

    // Call API Get Products
    // const getProducts = async () => {
    //     try {
    //         const response = await axios.get(`${apiUrl}/get-products`);
    //         // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    //         setShoes(response.data.data);
    //     } catch (error: unknown) {
    //         console.log(error);
    //     }
    // };

    // Handle Add Shoe to Cart
    const handleAddToCart = (shoe: Shoe) => {
        const newShoe = { ...shoe, num: 1 };
        setCart([...cart, newShoe]);
        setTotal(total + shoe.price);
    };
    // Handle when click button Minus
    const handleMinus = (id: number) => {
        const index = cart.findIndex((item) => item.id === id);
        const newCart = cart.slice();
        if (cart[index].num > 1) {
            newCart[index].num--;
            setTotal(total - newCart[index].price);
            setCart(newCart);
        } else {
            setTotal(total - newCart[index].price * newCart[index].num);
            newCart.splice(index, 1);
            setCart(newCart);
        }
    };
    // Handle when click button Plus
    const handlePlus = (id: number) => {
        const index = cart.findIndex((item) => item.id === id);
        const newCart = cart.slice();
        newCart[index].num++;
        setTotal(total + newCart[index].price);
        setCart(newCart);
    };
    // Handle when click button Trash
    const handleTrash = (id: number) => {
        const index = cart.findIndex((item) => item.id === id);
        const newCart = cart.slice();
        setTotal(total - newCart[index].price * newCart[index].num);
        newCart.splice(index, 1);
        setCart(newCart);
    };
    useEffect(() => {
        // void getProducts();
    }, []);

    return (
        <div className="max-w-[800px] mt-5 mx-auto flex flex-col tablet:flex-row tablet:justify-between items-center before:layout animate-app-wave">
            <div className="card card-shadow">
                <div className="relative my-3">
                    <img src={nike} alt="Nike Logo" className="w-[50px] z-[1]" />
                </div>
                <div className="relative text-3xl font-bold my-4">Our Products</div>
                <div className="relative h-[calc(100%-98px)] overflow-y-scroll no-scrollbar">
                    {shoes.map((shoe) => {
                        return (
                            <div className="pb-20" key={shoe.id}>
                                <div
                                    className="rounded-[30px] h-[300px] minimoblie:h-[380px]"
                                    style={{ backgroundColor: `${shoe.color}` }}
                                >
                                    <img src={shoe.image} alt={shoe.name} className="rotate-[-24deg] ml-[-16px]" />
                                </div>
                                <h2 className="text-2xl font-bold mt-[26px] mb-5">{shoe.name}</h2>
                                <div className="mb-5">
                                    <p className="text-sm text-[#777] leading-[1.8]">{shoe.description}</p>
                                </div>
                                <div className="flex justify-between items-center relative">
                                    <div className="text-xl font-bold">${shoe.price}</div>

                                    <button
                                        className={`btn text-base uppercase transition-all duration-200 absolute right-0 ${
                                            cart.findIndex((item) => item.id === shoe.id) === -1
                                                ? "visible opacity-100"
                                                : "invisible opacity-0"
                                        }`}
                                        onClick={() => handleAddToCart(shoe)}
                                    >
                                        <p>Add to cart</p>
                                    </button>
                                    <p
                                        className={`w-[46px] h-[46px] bg-Yellow flex justify-center items-center rounded-full transition-all ${
                                            cart.findIndex((item) => item.id === shoe.id) === -1
                                                ? "invisible"
                                                : "visible"
                                        }`}
                                    >
                                        <img src={check} alt="Check" className="w-5 text-xs" />
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="card card-shadow">
                <div className="relative my-3">
                    <img src={nike} alt="Nike Logo" className="w-[50px] z-[1]" />
                </div>
                <div className="relative text-3xl font-bold my-4 flex justify-between">
                    <div>Your cart</div>
                    <div>${Number(total).toFixed(2)}</div>
                </div>
                {cart.length === 0 && <p className="relative text-sm">Your cart is empty.</p>}
                <div className="h-[calc(100%-98px)] overflow-y-scroll no-scrollbar scroll-smooth pb-10">
                    {cart.map((item) => {
                        return (
                            <div className="flex py-5 relative" key={item.id}>
                                <div
                                    className="w-[90px] h-[90px] rounded-full mr-[34px] cart-item-filter"
                                    style={{ backgroundColor: `${item.color}` }}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="absolute top-[-15%] left-[-6%] rotate-[-24deg] w-[130px]"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm lead-[1.5] mb-[10px]">{item.name}</h4>
                                    <p className="text-2xl font-bold mb-4">${item.price}</p>
                                    <div className="flex justify-between">
                                        <div className="flex gap-4 items-center">
                                            <button
                                                className="w-7 h-7 rounded-full bg-[#eee] flex justify-center items-center"
                                                onClick={() => handleMinus(item.id)}
                                            >
                                                <img src={minus} alt="Minius" className="w-2" />
                                            </button>
                                            <p>{item.num}</p>
                                            <button
                                                className="w-7 h-7 rounded-full bg-[#eee] flex justify-center items-center"
                                                onClick={() => handlePlus(item.id)}
                                            >
                                                <img src={plus} alt="Plus" className="w-2" />
                                            </button>
                                        </div>
                                        <button
                                            className="w-8 h-8 rounded-full bg-Yellow flex justify-center items-center"
                                            onClick={() => handleTrash(item.id)}
                                        >
                                            <img src={trash} alt="Trash" className="w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;
