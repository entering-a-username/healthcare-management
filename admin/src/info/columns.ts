export const columnsInfo = {
    appointment: {
        header: ["ID", "Sub Category", "Image", "Items Amount", "Date Created"],
        fields: ["", "name", "icons", "itemsAmount", "dateCreated"],
    },
    doctor: {
        header: ["ID", "Name", "Image", "Email", "Speciality", "About", "Degree", "Experience", "Fee", "Available", "Booked Appointments", "Date Created"],
        fields: ["", "name", "icon", "email", "speciality", "about", "degree", "experience", "fee", "available", "slotsBooke", "createdAt"],
    },
    user: {
        header: ["ID", "Name", "Image", "Email", "Date of Birth", "Phone Number", "Address", "Booked Appointments", "Date Created"],
        fields: ["", "name", "icon", "email", "dateOfBirth", "phone", "address", "appointments", "createdAt"],
    }
}