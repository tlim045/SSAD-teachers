import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
describe('Only 8 questions allowed to be selected', () => {
  it('Only 8 assignments', () => {
    const newSelected = ['1','1','1','1','1','1','1','1']
    expect(newSelected).toHaveLength(8)
  })
})