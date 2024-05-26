// User model
interface User {
    id: number;
    createdOn: string;
    modifiedOn: string;
    deletedOn: string;
  }
  
  // Conversation model
  interface Conversation {
    id: number;
    createdOn: string;
    modifiedOn: string;
    deletedOn: string;
    userId: number;
  }
  
  // Message model
  interface Message {
    id: number;
    createdOn: string;
    modifiedOn: string;
    deletedOn: string;
    conversationId: number;
    role: string;
    content: string;
  }
  
  // ProductList model
  interface ProductList {
    id: number;
    createdOn: string;
    modifiedOn: string;
    deletedOn: string;
    userId: number;
  }
  
  // Product model
  interface Product {
    id: number;
    createdOn: string;
    modifiedOn: string;
    deletedOn: string;
    productListId: number;
    productType: Object;
    productId: number;
  }
  
  // KitchenTop model
  interface KitchenTop {
    id: number;
    createdOn: string;
    modifiedOn: string;
    deletedOn: string;
    material: string;
    backSplash: number;
    windowSill: number;
    drillHoles: number;
    wallSocketPossibility: boolean;
    edgeFinishingPossibility: boolean;
    pricePerSquare: number;
    edgeFinishingPricePerMeter: number;
    backSplashPricePerMeter: number;
    windowSillPricePerMeter: number;
    underMountSinkCutout: number;
    insetCutout: number;
    roughCutout: number;
    faucetHole: number;
    soapDispenser: boolean;
    drillHolesPerPiece: number;
    wallSocketPricePerPiece: number;
    backPanelPricePerMeter: number;
    backPanelEdgeFinishingPricePerMeter: number;
  }