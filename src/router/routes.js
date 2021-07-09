import HomeView from '@/views/home';

export default [{
        path: '/sign-in',
        name: 'SignIn',
        component() {
            return import ('@/views/sign-in');
        },
        meta: {
            disableNavigationPanel: true,
            disableSidePanel: true
        }
    },
    {
        path: '/',
        name: 'Home',
        component: HomeView
    }
];