import renderer from 'react-test-renderer';
import Home from '.';

it('a', ()=>{
    const component = renderer
    .create(<Home />)
    .toJSON();
    expect(component).toMatchSnapshot();
})