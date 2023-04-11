import Provide from './src/redux/Provider';
import PreApp from './PreApp';


export default function App() {

  return (
    <Provide>
      <PreApp />
    </Provide>
  );
}
