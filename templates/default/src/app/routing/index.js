import home from './home';

const routes = [
    home
];

export default function routing($stateProvider) {
    routes.forEach(routeConfig => {
        const configs = Object.keys(routeConfig);

        configs.forEach((configKey) => {
            if (typeof configKey === 'string') {
                $stateProvider.state(configKey, routeConfig[configKey]);
            }
        });
    });
}

routing.$inject = ['$stateProvider'];
