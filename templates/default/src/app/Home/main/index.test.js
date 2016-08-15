import '../../Home';

describe('component: Main', () => {
    let component;
    let scope;
    let $componentController;

    beforeEach(angular.mock.module('<%= appName %>.home'));

    beforeEach(() => {
        inject(($rootScope, _$componentController_) => {
            scope = $rootScope.$new();
            $componentController = _$componentController_;

            component = $componentController('homeMain', {
                $scope: scope
            });
        });
    });

    it('should instantiate the main home component', function() {
        expect(component).toBeDefined();
    });
});
