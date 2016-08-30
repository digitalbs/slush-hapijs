import '../../Home';

describe('Home::Component::main', () => {
    let component,
        scope,
        $componentController;
    
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
    
    it('should instantiate the main home component', () => {
        expect(component).toBeDefined();
    });
});
