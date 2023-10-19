import { useState } from "react";
import { RegisterModal, LoginModal } from "../";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const user = useSelector((state) => state.user.user);

  const auth = getAuth();

  return (
    <header className="bg-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold text-green cursor-pointer">salt</h1>
        </Link>
        <nav>
          {!user ? (
            <div className="flex gap-2">
              <div className="flex space-x-4">
                <div
                  className="bg-white text-sm font-bold text-green py-2 px-8 rounded-full cursor-pointer transition-all ease-in-out duration-300 hover:text-darkgreen "
                  onClick={() => setIsOpenRegister(true)}
                >
                  Yetkili Kayıt
                </div>
              </div>
              <div className="flex space-x-4">
                <div
                  className="bg-green text-sm font-bold text-white py-2 px-8 rounded-full cursor-pointer transition-all ease-in-out duration-300 hover:bg-darkgreen "
                  onClick={() => setIsOpenLogin(true)}
                >
                  Yetkili Girişi
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              {user.type === 1 && (
                <div className="flex gap-2">
                  <Link to="/inspection">
                    <div className="flex space-x-4">
                      <div className="bg-white text-sm font-bold text-green py-2 px-8 rounded-full cursor-pointer transition-all ease-in-out duration-300 hover:text-darkgreen ">
                        Sayım Ekle
                      </div>
                    </div>
                  </Link>
                  <Link to="/demand">
                    <div className="flex space-x-4">
                      <div className="bg-green text-sm font-bold text-white py-2 px-8 rounded-full cursor-pointer transition-all ease-in-out duration-300 hover:bg-darkgreen ">
                        Talep Oluştur
                      </div>
                    </div>
                  </Link>
                </div>
              )}
              <div className="flex space-x-4">
                <div
                  className="bg-red text-sm font-bold text-white py-2 px-8 rounded-full cursor-pointer transition-all ease-in-out duration-300 hover:bg-white hover:text-red"
                  onClick={() => auth.signOut()}
                >
                  Çıkış Yap
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
      <RegisterModal isOpen={isOpenRegister} setIsOpen={setIsOpenRegister} />
      <LoginModal isOpen={isOpenLogin} setIsOpen={setIsOpenLogin} />
    </header>
  );
};

export default Header;
