declare namespace API {
  type Base64UploadFileRequest = {
    biz?: string;
    fileBase64?: string;
  };

  type BaseResponseboolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseint = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseListProduct = {
    code?: number;
    data?: Product[];
    message?: string;
  };

  type BaseResponseLoginUserVO = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponselong = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseobject = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePagePost = {
    code?: number;
    data?: PagePost;
    message?: string;
  };

  type BaseResponsePagePostVO = {
    code?: number;
    data?: PagePostVO;
    message?: string;
  };

  type BaseResponsePageProduct = {
    code?: number;
    data?: PageProduct;
    message?: string;
  };

  type BaseResponsePageProductVO = {
    code?: number;
    data?: PageProductVO;
    message?: string;
  };

  type BaseResponsePageUser = {
    code?: number;
    data?: PageUser;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponsePost = {
    code?: number;
    data?: Post;
    message?: string;
  };

  type BaseResponsePostVO = {
    code?: number;
    data?: PostVO;
    message?: string;
  };

  type BaseResponseProduct = {
    code?: number;
    data?: Product;
    message?: string;
  };

  type BaseResponseProductSignResponse = {
    code?: number;
    data?: ProductSignResponse;
    message?: string;
  };

  type BaseResponsestring = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserLoginByWxMpGetSceneResponse = {
    code?: number;
    data?: UserLoginByWxMpGetSceneResponse;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type BaseResponseWxJsapiSignature = {
    code?: number;
    data?: WxJsapiSignature;
    message?: string;
  };

  type checkUsingGETParams = {
    /** timestamp */
    timestamp?: string;
    /** nonce */
    nonce?: string;
    /** signature */
    signature?: string;
    /** echostr */
    echostr?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type genProductSignUsingGETParams = {
    couponId?: number;
    productId?: number;
  };

  type getPostByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getPostVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getProductByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getSignUsingGETParams = {
    /** url */
    url?: string;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type LoginUserVO = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type ModelAndView = {
    empty?: boolean;
    model?: Record<string, any>;
    modelMap?: Record<string, any>;
    reference?: boolean;
    status?:
      | 'ACCEPTED'
      | 'ALREADY_REPORTED'
      | 'BAD_GATEWAY'
      | 'BAD_REQUEST'
      | 'BANDWIDTH_LIMIT_EXCEEDED'
      | 'CHECKPOINT'
      | 'CONFLICT'
      | 'CONTINUE'
      | 'CREATED'
      | 'DESTINATION_LOCKED'
      | 'EXPECTATION_FAILED'
      | 'FAILED_DEPENDENCY'
      | 'FORBIDDEN'
      | 'FOUND'
      | 'GATEWAY_TIMEOUT'
      | 'GONE'
      | 'HTTP_VERSION_NOT_SUPPORTED'
      | 'IM_USED'
      | 'INSUFFICIENT_SPACE_ON_RESOURCE'
      | 'INSUFFICIENT_STORAGE'
      | 'INTERNAL_SERVER_ERROR'
      | 'I_AM_A_TEAPOT'
      | 'LENGTH_REQUIRED'
      | 'LOCKED'
      | 'LOOP_DETECTED'
      | 'METHOD_FAILURE'
      | 'METHOD_NOT_ALLOWED'
      | 'MOVED_PERMANENTLY'
      | 'MOVED_TEMPORARILY'
      | 'MULTIPLE_CHOICES'
      | 'MULTI_STATUS'
      | 'NETWORK_AUTHENTICATION_REQUIRED'
      | 'NON_AUTHORITATIVE_INFORMATION'
      | 'NOT_ACCEPTABLE'
      | 'NOT_EXTENDED'
      | 'NOT_FOUND'
      | 'NOT_IMPLEMENTED'
      | 'NOT_MODIFIED'
      | 'NO_CONTENT'
      | 'OK'
      | 'PARTIAL_CONTENT'
      | 'PAYLOAD_TOO_LARGE'
      | 'PAYMENT_REQUIRED'
      | 'PERMANENT_REDIRECT'
      | 'PRECONDITION_FAILED'
      | 'PRECONDITION_REQUIRED'
      | 'PROCESSING'
      | 'PROXY_AUTHENTICATION_REQUIRED'
      | 'REQUESTED_RANGE_NOT_SATISFIABLE'
      | 'REQUEST_ENTITY_TOO_LARGE'
      | 'REQUEST_HEADER_FIELDS_TOO_LARGE'
      | 'REQUEST_TIMEOUT'
      | 'REQUEST_URI_TOO_LONG'
      | 'RESET_CONTENT'
      | 'SEE_OTHER'
      | 'SERVICE_UNAVAILABLE'
      | 'SWITCHING_PROTOCOLS'
      | 'TEMPORARY_REDIRECT'
      | 'TOO_EARLY'
      | 'TOO_MANY_REQUESTS'
      | 'UNAUTHORIZED'
      | 'UNAVAILABLE_FOR_LEGAL_REASONS'
      | 'UNPROCESSABLE_ENTITY'
      | 'UNSUPPORTED_MEDIA_TYPE'
      | 'UPGRADE_REQUIRED'
      | 'URI_TOO_LONG'
      | 'USE_PROXY'
      | 'VARIANT_ALSO_NEGOTIATES';
    view?: View;
    viewName?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PagePost = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Post[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePostVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PostVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageProduct = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Product[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageProductVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: ProductVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type Post = {
    content?: string;
    contentType?: number;
    createTime?: string;
    editTime?: string;
    favourNum?: number;
    id?: number;
    isDelete?: number;
    priority?: number;
    tags?: string;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
    viewNum?: number;
  };

  type PostAddRequest = {
    content?: string;
    contentType?: number;
    tags?: string[];
    title?: string;
  };

  type PostEditRequest = {
    content?: string;
    contentType?: number;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostFavourAddRequest = {
    postId?: number;
  };

  type PostFavourQueryRequest = {
    ascSortField?: string[];
    current?: number;
    descSortField?: string[];
    pageSize?: number;
    postQueryRequest?: PostQueryRequest;
    userId?: number;
  };

  type PostQueryRequest = {
    ascSortField?: string[];
    content?: string;
    contentType?: number;
    current?: number;
    descSortField?: string[];
    endTime?: string;
    favourUserId?: number;
    id?: number;
    notId?: number;
    orTags?: string[];
    pageSize?: number;
    priority?: number;
    searchText?: string;
    startTime?: string;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type PostThumbAddRequest = {
    postId?: number;
  };

  type PostUpdateRequest = {
    content?: string;
    contentType?: number;
    id?: number;
    tags?: string[];
    title?: string;
    viewNum?: number;
  };

  type PostViewAddRequest = {
    postId?: number;
  };

  type PostVO = {
    content?: string;
    contentType?: number;
    createTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    hasThumb?: boolean;
    id?: number;
    priority?: number;
    tagList?: string[];
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
    viewNum?: number;
  };

  type Product = {
    appId?: number;
    content?: string;
    cover?: string;
    createTime?: string;
    extraInfo?: string;
    id?: number;
    isDelete?: number;
    leftNum?: number;
    name?: string;
    price?: number;
    soldNum?: number;
    status?: number;
    type?: string;
    updateTime?: string;
    userId?: number;
  };

  type ProductAddRequest = {
    content?: string;
    cover?: string;
    extraInfo?: string;
    leftNum?: number;
    name?: string;
    price?: number;
    status?: number;
    type?: string;
  };

  type ProductOrder = {
    appId?: number;
    content?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    payTime?: string;
    price?: number;
    productId?: number;
    tradeState?: string;
    updateTime?: string;
    userId?: number;
    wxPayInfo?: string;
    wxPayQrCode?: string;
  };

  type ProductOrderPaySucceedInfo = {
    product?: Product;
    productOrder?: ProductOrder;
  };

  type ProductQueryRequest = {
    appId?: number;
    ascSortField?: string[];
    content?: string;
    current?: number;
    descSortField?: string[];
    extraInfo?: string;
    id?: number;
    name?: string;
    pageSize?: number;
    status?: number;
    type?: string;
    userId?: number;
  };

  type ProductSignResponse = {
    appId?: number;
    price?: number;
    productId?: number;
    sign?: string;
    timestamp?: number;
  };

  type ProductUpdateRequest = {
    content?: string;
    cover?: string;
    extraInfo?: string;
    id?: number;
    leftNum?: number;
    name?: string;
    price?: number;
    status?: number;
    type?: string;
  };

  type ProductVO = {
    appId?: number;
    content?: string;
    cover?: string;
    id?: number;
    leftNum?: number;
    name?: string;
    price?: number;
    status?: number;
    type?: string;
    userId?: number;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    createTime?: string;
    id?: number;
    isDelete?: number;
    mpOpenId?: string;
    scene?: string;
    unionId?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userProfile?: string;
    userRole?: string;
    vipExpireTime?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserEditRequest = {
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
  };

  type userLoginByWxMiniappUsingGETParams = {
    /** code */
    code?: string;
  };

  type UserLoginByWxMpGetSceneResponse = {
    qrCode?: string;
    scene?: string;
  };

  type UserLoginByWxMpRequest = {
    scene?: string;
  };

  type userLoginByWxOpenUsingGETParams = {
    /** code */
    code: string;
  };

  type UserLoginMockRequest = {
    userId?: number;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    ascSortField?: string[];
    current?: number;
    descSortField?: string[];
    id?: number;
    mpOpenId?: string;
    pageSize?: number;
    unionId?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
    vipExpireTime?: string;
  };

  type View = {
    contentType?: string;
  };

  type WxJsapiSignature = {
    appId?: string;
    nonceStr?: string;
    signature?: string;
    timestamp?: number;
    url?: string;
  };
}