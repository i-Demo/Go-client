import logo from "~/assets/images/favicon.ico";
function NotFound() {
    return (
        <div className="bg-primary w-screen h-screen flex flex-col justify-center items-center gap-4 text-center">
            <img src={logo} alt="Logo" />
            <h3 className="text-2xl font-bold mt-8">Không có trang này</h3>
            <p className="mb-8 opacity-90 text-sm font-semibold">Đã xảy ra lỗi, vui lòng thử lại sau</p>

            <a
                href="/"
                className="btn"
            >
                Trang chủ
            </a>
        </div>
    );
}

export default NotFound;
