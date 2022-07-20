import renderer from 'react-test-renderer';
import { Inputs } from './form';

it('without blow up',()=>{
    const component = renderer
    .create(<Inputs init='name' type='name' dispatch={()=>{}} />)
    .toJSON()
    expect(component).toMatchSnapshot();
})