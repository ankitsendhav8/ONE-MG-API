import StaticPageService from '../../services/staticpage.service';

class StaticPageController {
  constructor(staticPageService) {
    this.StaticPageService = staticPageService;
  }
  content = async (req, res) => {
    try {
      const page_code = req.query.page_code;
      let result;
      result = await StaticPageService.getPage(page_code);
      if (result && result.length) {
        let pageContent = {
          page_id: result[0].iPageId,
          page_code: result[0].vPageCode,
          page_title: result[0].vPageTitle,
          content: result[0].vContent,
          status: result[0].eStatus,
          dateCreated: result[0].dtDatecreated,
        };
        res.status(200).json({
          success: 1,
          message: 'Page content found successfully',
          data: pageContent,
        });
      } else {
        res.status(200).json({
          success: 0,
          message: 'Something went wrong, please try again',
          data: {},
        });
      }
    } catch (err) {
      res.status(500).json({
        success: 0,
        message: err.code,
      });
    }
  };
}
export default new StaticPageController(StaticPageService);
