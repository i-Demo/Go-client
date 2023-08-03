import { useState, useEffect } from "react";
import nike from "~/assets/images/nike.png";
import check from "~/assets/images/check.png";
import minus from "~/assets/images/minus.png";
import plus from "~/assets/images/plus.png";
import trash from "~/assets/images/trash.png";
// import { LOCAL_STORAGE_CART_NAME } from "~/variables";
import { apiUrl } from "~/variables";
import axios from "axios";

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
    const [shoes, setShoes] = useState<Shoe[]>([]);
    const [cart, setCart] = useState<Cart[]>([]);
    const [total, setTotal] = useState(0);

    // Call API Get Products
    const getProducts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/products`);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
            setShoes(response.data.shoes);
        } catch (error: unknown) {
            console.log(error);
        }
    };

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
        void getProducts();
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
