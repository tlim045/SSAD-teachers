
import mockAxios from "../mocks/axios";

it("Test retrieval of questions", async () => {
    // set up mock Axios data retrieval
    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            data:{
                Email:['correctEmail@gmail.com']
            }
        })
    );

});