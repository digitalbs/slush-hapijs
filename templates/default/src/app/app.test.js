import app from './app';

describe('App: Testing Modules', () => {
    describe('App Module:', () => {
        
        let module;
        
        beforeEach(() => {
            module = angular.mock.module(app.name);
        });
        
        it('should be registered', () => {
            expect(module).not.toBeNull();
        });
        
    });
});
