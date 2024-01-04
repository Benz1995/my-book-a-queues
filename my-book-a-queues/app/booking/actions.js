'use server'
export async function createQueue(prevState, formData) {
    let name = formData.get("name");
    let surname = formData.get("surname");
    let phone = formData.get("phone");
    let email = formData.get("email");
    //process.env.setUrlApi
    if(name.trim() == "" || surname.trim() == "" || phone.trim() == "" || email.trim() == ""){
        return { message: 'กรุณากรอกข้อมูลให้ครบ',status: 1}
    }
    const formDataNew = {
        'name':name,
        'surname':surname,
        'phone':phone,
        'email':email,
    }
    try {
        const response = await fetch(`${process.env.SETURL_API}/api/bookings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
          body: JSON.stringify(formDataNew),
        });

        if (!response.ok) {
          if (response.status === 409) {
            return { title:"การจองคิว",message: 'คุณได้เคยกดจองคิวไปแล้ว',status: response.status}
          }
          return { title:"ผิดพลาด",message: 'กรุณาติดต่อเจ้าหน้าที่',status: response.status}
        }
  
        const data = await response.json();
        return { title:"การจองคิว",message: 'ได้ทำการลงทะเบียนเป็นที่เรียบร้อยแล้ว',status: response.status,queue:data.queueNumber}
      } catch (err) {
        return { title:"ผิดพลาด",message: 'ติดต่อเจ้าหน้าที่ 3',status: 404}
      }

}

export async function wait(ms){
  return new Promise(resolve => setTimeout(resolve,ms))
}