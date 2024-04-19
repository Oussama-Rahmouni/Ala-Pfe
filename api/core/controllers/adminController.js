import Request
 from "../../app/models/requestModel.js";
class AdministrationController {

    static async listRequests(req, res){
        try {
            // Fetch all requests from the database
            const requests = await Request.find({});
            res.status(200).json(requests);
          } catch (error) {
            res.status(500).json({ message: 'Something went wrong when fetching requests.', error: error.message });
          }
    }

    static async approuveRequest(req, res){
        try {
            const request = await Request.findById(req.params.id);
            if (!request) {
              return res.status(404).json({ message: 'Request not found.' });
            }
            if (request.status === 'approved') {
              return res.status(400).json({ message: 'Request already approved.' });
            }
        
            request.status = 'approved';
            await request.save();
            res.status(200).json({ message: 'Request approved successfully.', request });
          } catch (error) {
            res.status(500).json({ message: 'Something went wrong.' });
          }
    }

    static async rejectRequest(req, res){
        try {
            const request = await Request.findById(req.params.id);
            if (!request) {
              return res.status(404).json({ message: 'Request not found.' });
            }
            if (request.status === 'rejected') {
              return res.status(400).json({ message: 'Request already rejected.' });
            }
        
            request.status = 'rejected';
            await request.save();
            res.status(200).json({ message: 'Request rejected successfully.', request });
          } catch (error) {
            res.status(500).json({ message: 'Something went wrong.' });
          }
    }
}

export default AdministrationController ;