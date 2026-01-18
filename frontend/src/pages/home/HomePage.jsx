import React from "react";
import todoImage from "../../assets/screen.png"

function HomePage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">

            {/* 히어로 섹션 */}
            <section className="relative bg-indigo-50">
                <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                            당신의 할 일을<br />더 빠르게, 더 쉽게
                        </h2>
                        <p className="text-lg text-gray-700">
                            MyTodoApp은 간단하고 직관적인 투두 관리 웹앱입니다. 하루를 계획하고 집중할 수 있도록 도와드립니다.
                        </p>
                        <div className="flex space-x-4">
                            <a href="/todos" className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-500 transition">
                                시작하기
                            </a>
                            <a href="#features" className="bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-100 transition">
                                기능 보기
                            </a>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-10 md:mt-0">
                        <img
                            src={todoImage}
                            alt="App Screenshot"
                            className="rounded-xl shadow-xl"
                        />
                    </div>
                </div>
            </section>

            {/* 기능 섹션 */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">주요 기능</h3>
                    <p className="text-gray-600">할 일을 쉽게 관리하고, 집중할 수 있는 기능들을 제공합니다.</p>
                </div>
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
                    <div className="p-6 bg-indigo-50 rounded-xl hover:shadow-lg transition">
                        <div className="text-indigo-600 text-4xl mb-4">📝</div>
                        <h4 className="font-semibold text-xl mb-2">간단한 관리</h4>
                        <p className="text-gray-700">빠르게 할 일을 추가하고 체크할 수 있습니다.</p>
                    </div>
                    <div className="p-6 bg-indigo-50 rounded-xl hover:shadow-lg transition">
                        <div className="text-indigo-600 text-4xl mb-4">⏰</div>
                        <h4 className="font-semibold text-xl mb-2">알림 기능</h4>
                        <p className="text-gray-700">중요한 일을 놓치지 않도록 알림을 받을 수 있습니다.</p>
                    </div>
                    <div className="p-6 bg-indigo-50 rounded-xl hover:shadow-lg transition">
                        <div className="text-indigo-600 text-4xl mb-4">📊</div>
                        <h4 className="font-semibold text-xl mb-2">통계 확인</h4>
                        <p className="text-gray-700">완료한 투두를 시각화하여 나의 하루를 점검할 수 있습니다.</p>
                    </div>
                </div>
            </section>

            {/* 사용 시나리오 / 케이스 */}
            <section id="usecase" className="py-20 bg-indigo-50">
                <div className="max-w-7xl mx-auto px-6 text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">이런 분들에게 추천</h3>
                    <p className="text-gray-700 max-w-2xl mx-auto">
                        개인 일정 관리부터 팀 업무까지, MyTodoApp은 효율적인 하루 계획을 지원합니다.
                    </p>
                </div>
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                        <h4 className="font-semibold text-xl mb-2">학생</h4>
                        <p className="text-gray-600">과제, 시험, 스케줄을 한눈에 관리할 수 있습니다.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                        <h4 className="font-semibold text-xl mb-2">직장인</h4>
                        <p className="text-gray-600">업무 할 일을 체크하고 집중 시간을 확보할 수 있습니다.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                        <h4 className="font-semibold text-xl mb-2">팀</h4>
                        <p className="text-gray-600">협업용 투두 리스트로 팀 프로젝트를 효율적으로 관리할 수 있습니다.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white py-12 text-center text-gray-500">
                &copy; 2026 MyTodoApp. All rights reserved.
            </footer>
        </div>
    );
}


export default HomePage;