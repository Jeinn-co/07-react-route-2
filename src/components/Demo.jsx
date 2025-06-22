import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useLocation,
  useNavigate,
  Navigate,
  useSearchParams,
  useMatch,
  matchPath,
  useMatches,
  generatePath,
} from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useEffect } from 'react';

// Link demo + useNavigate demo
function Home() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    // useNavigate 範例
    // 點擊按鈕時，程式導向 dashboard
    navigate('/dashboard');
  };

  return (
    <div>
      <h2>Home</h2>
      {/* Link 其實是渲染成 <a href="...">，但不 reload */}
      <nav>
        {/* <a href="/user/30">使用者頁面(anchor tag)</a> | */}
        <Link to="/user/30">使用者頁面</Link> |
        <Link to="/products?category=book&page=2">產品列表</Link>
      </nav>
      <button onClick={goToDashboard}>Go to Dashboard</button>
    </div>
  );
}

// useParams + useMatch + matchPath demo
function UserProfile() {
  const { id } = useParams(); // 抓路由參數 /user/:id
  const match = useMatch('/user/:id'); // 自動抓 pathname 比對
  const location = useLocation(); // 取得目前 URL 路徑
  const manualMatch = matchPath('/user/:id', location.pathname); // 手動比對

  return (
    <div>
      <h2>User Profile</h2>
      <p>useParams: {id}</p>
      <p>useMatch: {match?.params?.id}</p>
      <p style={{ backgroundColor: '#eee', padding: 10 }}>
        <pre> {JSON.stringify(match, null, 2)}</pre>
      </p>
      <hr />
      <p>Current path: {location.pathname}</p>
      <p>matchPath: {manualMatch?.params?.id}</p>
      <p style={{ backgroundColor: '#eee', padding: 10 }}>
        <pre> {JSON.stringify(manualMatch, null, 2)}</pre>
      </p>
    </div>
  );
}

// useSearchParams demo
function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const page = searchParams.get('page');

  const goToMusicPage1 = () => {
    setSearchParams({ category: 'music', page: '1' });
  };

  return (
    <div>
      <h2>產品頁</h2>
      <p>分類：{category}</p>
      <p>頁數：{page}</p>
      <button onClick={goToMusicPage1}>切換到 music 第1頁</button>
    </div>
  );
}

// Navigate demo
function Dashboard() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    // 未登入就自動導向 login
    return <Navigate to="/login" replace />;
  }

  return <div>Dashboard</div>;
}

// generatePath + useMatches demo
function Admin() {
  const location = useLocation();
  const path = generatePath('/team/:teamId/member/:memberId', {
    teamId: 'A',
    memberId: '007',
  });

  const matches = useMatches();
  const allowed = ['dashboard', 'admin', 'settings/:id'];
  const isWhitelisted = matches.some(m =>
    allowed.includes(m?.pattern?.path || '')
  );

  return (
    <div>
      <h2>Admin Page</h2>
      <p>產生的 Path: {path}</p>
      <p>目前位置：{location.pathname}</p>
      <p>是否在白名單中：{isWhitelisted ? '是' : '否'}</p>
      <div>
        麵包屑：
        <nav>
          {matches
            .filter(m => m.handle?.breadcrumb)
            .map((m, idx) => (
              <span key={idx}>
                {idx > 0 && ' / '}
                {m.handle.breadcrumb}
              </span>
            ))}
        </nav>
      </div>
    </div>
  );
}

// Login page
function Login() {
  return <div>Login Page</div>;
}

// Not found
function NotFound() {
  return <div>404 Not Found</div>;
}

// 主架構
export function DemoCode() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
