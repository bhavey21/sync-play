"use client"
import axios from "axios";
import { useEffect, useState } from "react";

export default function KomalInvite() {
  const [response, setResponse] = useState<boolean | undefined>();
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    getLatestResponse();
  }, []);

  const getLatestResponse = async () => {
    const data: any = await axios.get('/api/komal-invite/2');
    setResponse(data?.data?.response);
    setReady(true);
  }

  const setAcceptResponse = async (response: boolean) => {
    setResponse(response);
    try {
      const { data } = await axios.post('/api/komal-invite/2', {
        response
      });

    } catch (error) {
      console.error('Update error:', error);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-100 to-purple-200">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg text-center">

        <div className="flex justify-center items-center space-x-6 mb-8">
          <img
            src="/images/badminton.png"
            alt="Badminton"
            className="w-40 h-40 object-contain rounded-xl shadow-lg"
          />
          <img
            src="/images/skating.png"
            alt="Skating"
            className="w-40 h-40 object-contain rounded-xl shadow-lg"
          />
        </div>

        <h1 className="text-4xl font-bold mb-6 text-pink-600">Hi कोमल 👋</h1>

        <p className="text-xl text-gray-700 mb-4 leading-relaxed">
          मैं आपको आमंत्रित करता हूँ एक <span className="font-semibold">बैडमिंटन मैच</span>,
          <span className="font-semibold"> स्केटिंग </span> और <span className="font-semibold">घूमने</span> के लिए।
        </p>

        <p className="text-lg text-gray-600 italic mb-8 leading-relaxed">
          कोशिश करना आने की, मुझे अच्छा लगेगा।
        </p>
        {(ready) && (
          <>
            <div className="flex justify-center space-x-6 mb-6">
              <button
                onClick={() => setAcceptResponse(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-8 rounded-lg shadow"
              >
                I Accept
              </button>
              <button
                onClick={() => setAcceptResponse(false)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-8 rounded-lg shadow"
              >
                I Reject
              </button>
            </div>

            {(response != undefined) && (
              <p className="text-lg text-purple-700 font-semibold">
                {response
                  ? "हां, मैं आऊंगी! 🎉"
                  : "नहीं आ पाऊंगी 😔"}
              </p>
            )}
          </>
        )}

      </div>
    </div>
  );
}
