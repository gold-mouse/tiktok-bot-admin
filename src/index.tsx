import ReactDOM, { Container } from 'react-dom/client';

import { ToastContainer, Bounce } from 'react-toastify';

import './index.css';
import App from './App';
import ThemeProviderWrapper from './core/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as Container);
root.render(
    <ThemeProviderWrapper>
        <App />
        <ToastContainer
            position="top-center"
            autoClose={5000}
            closeOnClick={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
        />
    </ThemeProviderWrapper>
);

