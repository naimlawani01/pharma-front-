import React, { useState } from 'react';
import { useCart } from '../context/cartContext';
import Navbar from '../components/navbar'; // Import de la Navbar
import PaymentModal from '../components/paymentPage';

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartItem, getTotalPrice } = useCart(); // Use the context
  const totalAmount = getTotalPrice(); // Get total amount from the context
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // État pour la modal

  return (
    <>
      {/* Navbar */}
      <Navbar /> 

      {/* Cart page content */}
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Mon Panier</h1>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <li key={item._id} className="flex py-6"> {/* Use item._id as the key */}
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt={item.name}
                      src={item.img || 'https://via.placeholder.com/150'}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.name}</h3>
                      <p className="ml-4">{item.price.toFixed(2)}€</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Quantité 
                        <input 
                          type="number" 
                          value={item.quantity} 
                          min="1" 
                          onChange={(e) => updateCartItem(item._id, parseInt(e.target.value, 10))}
                          className="ml-2 w-16 border rounded-md"
                        />
                      </p>
                      <div className="flex flex-col">
                        {item.prescription && (
                          <p className="text-red-500 text-sm mb-1">Requiert une ordonnance</p>
                        )}
                        <button 
                          type="button" 
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => removeFromCart(item._id)} // Remove only this item
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">Aucun produit dans le panier.</p>
            )}
          </ul>
        </div>

        {/* Total and buttons */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 mt-6 pt-4">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Prix Total</p>
              <p>{totalAmount.toFixed(2)}€</p>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Valider la commande
              </button>
            </div>

            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                ou{' '}
                <a href="all-products" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Continuer vos achats
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Modal de paiement */}
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
    </>
  );
};

export default CartPage;
