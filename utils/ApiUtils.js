class ApiUtils
{
    constructor(apiContext,LoginPayload)
    {
        this.apiContext = apiContext;
        this.LoginPayload = LoginPayload;
    }


    async getToken()
    {
         const LoginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data:this.LoginPayload
        });

    // expect(LoginResponse.ok()).toBeTruthy();
    const LoginResponseJson = await LoginResponse.json();
    console.log(await LoginResponse.status());
    console.log(await LoginResponse.url());
    console.log(LoginResponseJson);
    const token =LoginResponseJson.token;
    console.log(token);
    return token;

    }

    async createOrder(OrderPaylode)
    {

        let response ={};
        response.token =await this.getToken();
         const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data:OrderPaylode,
            headers:{
                        'Authorization' : response.token,
                        'Content-Type': 'application/json' 
                    },
             
        }
      )

      const orderJson = await orderResponse.json();
      console.log(orderJson);
      const orderID = orderJson.orders[0];

      response.orderID= orderID;
      return response;
      

    }


}
module.exports={ApiUtils}