import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
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
import { useEffect } from 'react';

// Home
function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Home</h2>
      <nav>
        <Link to="/user/30">使用者頁面</Link> |
        <Link to="/products?category=book&page=2">產品列表</Link> |
        <Link to="/admin/setting">Admin Setting</Link>
      </nav>
      <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
    </div>
  );
}

// User
function UserProfile() {
  const { id } = useParams();
  const match = useMatch('/user/:id');
  const location = useLocation();
  const manualMatch = matchPath('/user/:id', location.pathname);

  return (
    <div>
      <h2>User Profile</h2>
      <p>useParams: {id}</p>
      <p>useMatch: {match?.params?.id}</p>
      <p>matchPath: {manualMatch?.params?.id}</p>
    </div>
  );
}

// Products
function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div>
      <h2>產品頁</h2>
      <p>分類：{searchParams.get('category')}</p>
      <p>頁數：{searchParams.get('page')}</p>
      <button onClick={() => setSearchParams({ category: 'music', page: '1' })}>
        切換到 music 第1頁
      </button>
    </div>
  );
}

// Dashboard
function Dashboard() {
  const isLoggedIn = false;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <div>Dashboard</div>;
}

// Admin layout with breadcrumbs
function AdminLayout() {
  const matches = useMatches();

  return (
    <div>
      <h2>Admin Layout</h2>
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

      <Outlet />
    </div>
  );
}

function AdminHome() {
  const location = useLocation();
  const path = generatePath('/team/:teamId/member/:memberId', {
    teamId: 'A',
    memberId: '007',
  });

  const matches = useMatches();
  // const allowed = ['dashboard', 'admin', 'settings/:id'];
  // const isWhitelisted = matches.some(m =>
  //   allowed.includes(m?.pattern?.path || '')
  // );
  const allowed = ['/dashboard', '/admin/setting', '/settings/:id'];
  // const allowed = ['/dashboard', '/admin', '/admin/setting', '/settings/:id'];

  // 判斷是否有一個符合 allowed 的 route path
  const isWhitelisted = matches.some(m => allowed.includes(m?.pathname || ''));

  return (
    <div>
      <h2>Admin Page</h2>
      <p>產生的 Path: {path}</p>
      <p>目前位置：{location.pathname}</p>
      <p>是否在白名單中：{isWhitelisted ? '是' : '否'}</p>
    </div>
  );
}

// Admin/Setting page
function Setting() {
  const location = useLocation();
  const matches = useMatches();

  // 產生一個示範的動態路徑
  const path = generatePath('/team/:teamId/member/:memberId', {
    teamId: 'A',
    memberId: '007',
  });

  // 定義白名單路由 path（根據 pattern.path）
  const allowed = ['/dashboard', '/admin', '/admin/setting', '/settings/:id'];

  // 判斷是否有一個符合 allowed 的 route path
  const isWhitelisted = matches.some(m => allowed.includes(m?.pathname || ''));

  // import { matchPath } from 'react-router-dom';
  // const allowedPatterns = ['/dashboard', '/admin', '/admin/setting', '/settings/:id'];
  // const isWhitelisted = allowedPatterns.some((pattern) =>
  //   matchPath(pattern, location.pathname)
  // );

  return (
    <div>
      <h3>Setting 頁面</h3>
      <p>generatePath: {path}</p>
      <p>目前位置：{location.pathname}</p>
      <p>是否在白名單中：{isWhitelisted ? '是' : '否'}</p>
    </div>
  );
}

// Login
function Login() {
  return <div>Login Page</div>;
}

// Not Found
function NotFound() {
  return <div>404 Not Found</div>;
}

const routes = [
  {
    path: '/',
    element: <Home />,
    handle: { breadcrumb: 'Home' },
  },
  {
    path: '/user/:id',
    element: <UserProfile />,
    handle: { breadcrumb: 'User' },
  },
  {
    path: '/products',
    element: <Products />,
    handle: { breadcrumb: 'Products' },
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    handle: { breadcrumb: 'Dashboard' },
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    handle: { breadcrumb: 'Admin' },
    children: [
      {
        index: true, // ➜ 對應 /admin
        element: <AdminHome />,
        handle: { breadcrumb: '首頁' }, // 若不想顯示麵包屑名稱可不加
      },
      {
        path: 'setting',
        element: <Setting />,
        handle: { breadcrumb: 'Setting' },
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    handle: { breadcrumb: 'Login' },
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes);

export function DemoCode2() {
  return <RouterProvider router={router} />;
}
