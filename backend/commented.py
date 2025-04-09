'''

<tbody>
                      {onOrderItems.map((item, index) => (
                        <tr key={index}>
                  <td>
                    <button
                      onClick={() => handleEditButtonClick(item.stock_id)}
                      className="editStock_button"
                    >
                      <MdEdit className="editStockIcon"/>
                    </button>
          
                    <button
                      onClick={() => {
                        setPopup(true);
                        setDeletePopupItem(item);
                      }}
                      className="editStock_button"
                    >
                      <MdDelete className="editStockIcon"/>
                    </button>
              </td>
              <td>{item.po}</td>
              <td>{item.product_name}</td>
              <td>{item.sku}</td>
              <td>${item.price}</td>
              <td>{item.quantity_ordered}</td>
            </tr>
      
                ))}
              </tbody>
            </table>





DATABASE Creation: ISD_ORDERS
isd_number
Requestor Name
Requestor Email
Requestor Address
CC
Items

'''