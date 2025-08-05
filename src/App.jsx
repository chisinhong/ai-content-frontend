import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [keyword, setKeyword] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateContent = async () => {
    if (!keyword) {
      setError('請輸入關鍵字！');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('YOUR_BACKEND_URL/api/generate', {
        keyword,
        platform,
      });
      if (response.data.content) {
        setContent(response.data.content);
      } else {
        setError('生成失敗，請重試！');
      }
    } catch (error) {
      setError('連線失敗，請檢查網絡！');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
        AI Content Generator 靚仔版
      </h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">
          關鍵字（例如：靚仔自拍）
        </label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="輸入關鍵字"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">平台</label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)} // 修正：setPlatform
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Instagram">Instagram</option>
          <option value="小紅書">小紅書</option>
          <option value="抖音">抖音</option>
        </select>
      </div>
      <button
        onClick={generateContent}
        disabled={loading}
        className={`w-full p-2 rounded text-white ${
          loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? '生成中...' : '生成內容'}
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {content && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold">生成內容：</h2>
          <p className="whitespace-pre-wrap">{content}</p>
          <button
            onClick={() => navigator.clipboard.writeText(content)}
            className="mt-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            複製到剪貼板
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
