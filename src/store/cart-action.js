import { cartAction } from "./cart-slice"
import { uiActions } from "./ui-slice"

export const fetchCartData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://learning-async-redux-default-rtdb.firebaseio.com/cart.json')
            if(!response.ok)
            {
                throw new Error('Could not fetch cart data')
            }

                const data = await response.json()

                return data
            
        }

        try{
         const cartData = await fetchData();
         dispatch(cartAction.replaceCart(cartData))
        }catch (error){
            dispatch(uiActions.showNotification({
                status:'error',
                title:'error',
                message:'sending cart data failed'
              }))
        }
    }
}

export const sendCartData = (cart) => {
 
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status:'pending..',
                title:'sending..',
                message:'Sending cart data!'
            })
        )

        const sendRequest = async () => {
            const response = await fetch('https://learning-async-redux-default-rtdb.firebaseio.com/cart.json',{
                method:'PUT',
                body: JSON.stringify(cart)
              })
              if(!response.ok)
              {
                throw new Error('sending cart data failed')
              }
        }

      try {
        await sendRequest()
        dispatch(uiActions.showNotification({
            status:'success',
            title:'success',
            message:'sending cart data successfully'
          }))
      }catch (error) {

        dispatch(uiActions.showNotification({
            status:'error',
            title:'error',
            message:'sending cart data failed'
          }))
      }

       

        
    

    }
}
