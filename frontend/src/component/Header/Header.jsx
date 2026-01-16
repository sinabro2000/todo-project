// src/components/Header.jsx
import React from "react";

function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 로고 클릭 시 홈으로 이동 */}
        <a href="/" className="text-2xl font-bold text-indigo-600">
          MyTodoApp
        </a>
        <nav className="space-x-6">
          <a href="#features" className="text-gray-700 hover:text-indigo-600 font-medium transition">Features</a>
          <a href="#usecase" className="text-gray-700 hover:text-indigo-600 font-medium transition">Use Case</a>
          <a href="#pricing" className="text-gray-700 hover:text-indigo-600 font-medium transition">Pricing</a>
          <a href="/todos" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition shadow-sm">
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;